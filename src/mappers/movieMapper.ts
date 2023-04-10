import MovieOutputDTO from "../dtos/movie/movie-output-dto";
import Genre from "../models/genre";
import Movie from "../models/movie";
import genreMapper from "./genreMapper";

class MovieMapper {
    
    public convertEntityToOutputDTOWithGenre(entity: Movie, genres: Genre[]): MovieOutputDTO {
        const genreDTOs = genreMapper.convertEntitiesToOutputDTOs(genres);
        return {
            id: entity.id,
            title: entity.title,
            synopsis: entity.synopsis,
            genres: genreDTOs
        }
    }

    public async convertEntityToOutputDTO(entity: Movie): Promise<MovieOutputDTO> {
        return this.convertEntityToOutputDTOWithGenre(entity, await entity.$get('genres'));
    }

    public convertEntitiesToOutputDTOs(entities: Array<Movie>): Array<MovieOutputDTO> {
        const dtos: Array<MovieOutputDTO> = [];
        for(let entity of entities) {
            dtos.push(this.convertEntityToOutputDTOWithGenre(entity, entity.genres));
        }
        return dtos;
    }
}

const movieMapper = new MovieMapper();
export default movieMapper;