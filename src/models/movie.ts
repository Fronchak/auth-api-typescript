import { Table, Column, Model, DataType, 
        AllowNull, Unique, BelongsToMany } from 'sequelize-typescript';
import Genre from './genre';
import MovieGenre from './moviegenre';

interface MovieAttributes {
    id: number;
    title: string;
    synopsis: string;
    genres: Genre[];
}

interface MovieCreationAttributes {
    title: string;
    synopsis: string;
}

@Table({
    tableName: 'movie'
})
class Movie extends Model<MovieAttributes, MovieCreationAttributes> {

    @Unique(true)
    @AllowNull(false)
    @Column({
        type: DataType.STRING(30)
    })
    title!: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(120),
    })
    synopsis!: string;

    @BelongsToMany(() => Genre, () => MovieGenre)
    genres!: Genre[];
}

export default Movie;