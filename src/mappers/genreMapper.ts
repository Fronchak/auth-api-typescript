import Genre from "../models/genre";
import GenreOutputDTO from "../dtos/genre/genre-output-dto";

class GenreMapper {
    
    public convertEntityToOutputDTO(entity: Genre): GenreOutputDTO {
        return {
            id: entity.id,
            name: entity.name
        }
    }

    public convertEntitiesToOutputDTOs(entities: Array<Genre>): Array<GenreOutputDTO> {
        return entities.map((entity) => this.convertEntityToOutputDTO(entity));
    }
}

const genreMapper = new GenreMapper();
export default genreMapper;