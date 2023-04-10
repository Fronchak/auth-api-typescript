import { Request, Response } from "express";
import movieService from "../services/movie-service";
import MovieInputDTO from "../dtos/movie/movie-input-dto";
import MovieOutputDTO from "../dtos/movie/movie-output-dto";

class MovieController {

    async save(req: Request, res: Response) {
        const outputDTO: MovieOutputDTO = await movieService.save(req.body as MovieInputDTO);
        return res.status(201).json(outputDTO);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const outputDTO: MovieOutputDTO = await movieService.findById(parseInt(id));
        return res.status(200).json(outputDTO);
    }

    async findAll(req: Request, res: Response) {
        const outputDTOs: Array<MovieOutputDTO> = await movieService.findAll();
        return res.status(200).json(outputDTOs); 
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const outputDTO: MovieOutputDTO = await movieService.update(req.body ,parseInt(id));
        return res.status(200).json(outputDTO); 
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await movieService.delete(parseInt(id));
        return res.status(204).json(); 
    }
}

const movieController = new MovieController();
export default movieController;