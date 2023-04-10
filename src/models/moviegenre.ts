import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import Genre from './genre';
import Movie from './movie';

interface MovieGenreAttributes {
    movieId: number;
    genreId: number;
}

@Table({
    tableName: 'movie_genre'
})
class MovieGenre extends Model<MovieGenreAttributes, MovieGenreAttributes> {

    @ForeignKey(() => Movie)
    @Column
    movieId!: number;

    @ForeignKey(() => Genre)
    @Column
    genreId!: number;
}

export default MovieGenre;