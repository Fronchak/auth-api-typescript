import { Request, Response } from "express";
import GenreOutputDTO from "../dtos/genre/genre-output-dto";
import genreService from "../services/genre-service";

class GenreController {

    public async save(req: Request, res: Response) {
        const { name } = req.body;
        const outputDTO: GenreOutputDTO = await genreService.save({ name });
        return res.status(201).json(outputDTO); 
    }

    public async findById(req: Request, res: Response) {
        const { id } = req.params;
        const outputDTO = await genreService.findById(parseInt(id));
        return res.status(200).json(outputDTO);
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name } = req.body;
        const outputDTO: GenreOutputDTO = await genreService.update({ name }, parseInt(id));
        return res.status(200).json(outputDTO);
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await genreService.delete(parseInt(id));
        return res.status(204).json();
    }

    public async findAll(req: Request, res: Response) {
        const outputDTOs = await genreService.findAll();
        return res.status(200).json(outputDTOs);
    }
}

const genreController = new GenreController();
export default genreController;