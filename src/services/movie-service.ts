import MovieInputDTO from "../dtos/movie/movie-input-dto";
import MovieOutputDTO from "../dtos/movie/movie-output-dto";
import Movie from "../models/movie";
import movieMapper from "../mappers/movieMapper";
import EntityNotFoundError from "../errors/entity-not-found-error";
import BadRequestError from "../errors/bas-request-error";
import conn from "../db/conn";
import { Transaction, Op } from "sequelize";
import Genre from "../models/genre";

class MovieService {

    public async save(inputDTO: MovieInputDTO): Promise<MovieOutputDTO> {
        const transaction: Transaction = await conn.transaction();
        let entity: Movie;
        let genres: Genre[];
        try {
            entity = await Movie.create({
                title: inputDTO.title,
                synopsis: inputDTO.synopsis
            }, { transaction: transaction });
            genres = await Genre.findAll({
                where: {
                    'id': {
                        [Op.in]: inputDTO.genreIds
                    }
                }
            });
            if(genres.length === 0) {
                throw new BadRequestError(`Invalid genreIds`);
            }
            await entity.$set('genres', genres, {
                transaction: transaction
            });
            await transaction.commit();
        }
        catch(e) {
            await transaction.rollback();
            if(e instanceof Error && e.name === 'SequelizeForeignKeyConstraintError') {
                throw new BadRequestError('Invalid genreId');
            }   
            throw e;
        } 
        return movieMapper.convertEntityToOutputDTOWithGenre(entity, genres);
    }

    public async findById(id: number): Promise<MovieOutputDTO> {
        const entity = await this.getEntityById(id);
        return movieMapper.convertEntityToOutputDTOWithGenre(entity, entity.genres);
    }

    private async getEntityById(id: number): Promise<Movie> {
        const entity = await Movie.findByPk(id, { include: [Genre] });
        if(!entity) {
            throw new EntityNotFoundError(`There is no movie with ID: ${id}`)
        }
        return entity;
    }

    public async findAll(): Promise<Array<MovieOutputDTO>> {
        const entities = await Movie.findAll({ include: [Genre] });
        return movieMapper.convertEntitiesToOutputDTOs(entities);
    }

    public async update(inputDTO: MovieInputDTO, id: number): Promise<MovieOutputDTO> {
        const transaction: Transaction = await conn.transaction();
        let entity: Movie;
        let genres: Array<Genre>
        try {
            const entityAux = await Movie.findByPk(id, { transaction: transaction });
            if(!entityAux) {
                throw new EntityNotFoundError(`There is no movie with ID: ${id}`);
            }
            entity = entityAux;
            entity.title = inputDTO.title,
            entity.synopsis = inputDTO.synopsis;
            entity = await entity.save({ transaction: transaction });
            genres = await Genre.findAll({
                where: {
                    id: {
                        [Op.in]: inputDTO.genreIds
                    }
                }
            });
            if(genres.length === 0) {
                throw new BadRequestError('Invalid genreIds');
            }
            await entity.$set('genres', genres);
            transaction.commit();
        }
        catch(e) {
            transaction.rollback();
            if(e instanceof Error && e.name === 'SequelizeForeignKeyConstraintError') {
                throw new BadRequestError('Invalid genreId');
            }   
            throw e;
        } 
        return movieMapper.convertEntityToOutputDTOWithGenre(entity, genres);
    }

    public async delete(id: number): Promise<void> {
        const entity = await this.getEntityById(id);
        await entity.destroy();
    }
}

const movieService = new MovieService();
export default movieService;