import { Sequelize } from 'sequelize-typescript';
import path from 'path';

const conn = new Sequelize({
    database: 'sequelize_ath_typescript',
    host: 'localhost',
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    dialect: 'mysql',
    models: [path.join(__dirname, '..', 'models')]
});

export default conn;