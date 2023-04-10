import { Table, Column, Model, DataType, AllowNull, Unique, BelongsToMany } from 'sequelize-typescript';
import Movie from './movie';
import MovieGenre from './moviegenre';

interface GenreAttributes {
    id: number;
    name: string;
    movies: Movie[]
}

interface GenreCreationAttributes {
    name: string;
}

@Table({
    tableName: 'genre'
})
class Genre extends Model<GenreAttributes, GenreCreationAttributes> {

    @Unique(true)
    @AllowNull(false)
    @Column({
        type: DataType.STRING(30)
    })
    name!: string;

    @BelongsToMany(() => Movie, () => MovieGenre)
    movies!: Movie[];
}

export default Genre;