import express from "express";
import errorHandler from "./error-handling/error-handler";

//Routes
import genreRoutes from "./routes/genre-routes";
import movieRoutes from "./routes/movie-routes";
import authRoutes from "./routes/auth-routes";

class App {
    public server: express.Application

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.errorHandler();
    }

    private middlewares() {
        this.server.use(express.json());
    }

    private routes() {
        this.server.use('/genres', genreRoutes);
        this.server.use('/movies', movieRoutes);
        this.server.use('/auth', authRoutes);
    }

    private errorHandler() {
        this.server.use(errorHandler);
    }
}

export default App;