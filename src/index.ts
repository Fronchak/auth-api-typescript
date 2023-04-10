import * as dotenv from 'dotenv';
dotenv.config();
import App from './app';
import conn from './db/conn';

const PORT = process.env.PORT || 3000;

conn.sync().then(() => {
    new App().server.listen(PORT, () => {
        console.log(`Server listen on port ${PORT}`);
    })
});
