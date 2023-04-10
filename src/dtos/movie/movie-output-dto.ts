import GenreOutputDTO from "../genre/genre-output-dto";

type MovieOutputDTO = {
    id: number;
    title: string;
    synopsis: string;
    genres: GenreOutputDTO[];
}

export default MovieOutputDTO;