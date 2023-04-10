import GenreInputDTO from "../dtos/genre/genre-input-dto";
import GenreOutputDTO from "../dtos/genre/genre-output-dto";
import EntityNotFoundError from "../errors/entity-not-found-error";
import Genre from "../models/genre";
import genreMapper from '../mappers/genreMapper';

class GenreService {

    public async save(inputDTO: GenreInputDTO): Promise<GenreOutputDTO> {
        const entity = await Genre.create({
            name: inputDTO.name
        });
        return genreMapper.convertEntityToOutputDTO(entity);
    } 

    public async findById(id: number): Promise<GenreOutputDTO> {
        const entity = await this.getEntityById(id);
        return genreMapper.convertEntityToOutputDTO(entity);
    }

    private async getEntityById(id: number): Promise<Genre> {
        const entity = await Genre.findByPk(id);
        if(!entity) {
            throw new EntityNotFoundError(`There is no genre with ID: ${id}`);
        }
        return entity; 
    }

    public async findAll(): Promise<Array<GenreOutputDTO>> {
        const entities = await Genre.findAll();
        return genreMapper.convertEntitiesToOutputDTOs(entities);
    }

    public async update(inputDTO: GenreInputDTO, id: number): Promise<GenreOutputDTO> {
        let entity = await this.getEntityById(id);
        entity.name = inputDTO.name;
        entity = await entity.save();
        return genreMapper.convertEntityToOutputDTO(entity);
    }

    public async delete(id: number): Promise<void> {
        
        const entity = await this.getEntityById(id);
        await entity.destroy();
    }
}

const genreService = new GenreService;
export default genreService;