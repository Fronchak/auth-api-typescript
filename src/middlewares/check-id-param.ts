import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/bas-request-error";

const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if(Number.isNaN(parseInt(id))) {
        return next(new BadRequestError(`ID param should be a number`))
    }
    next();
}

export default checkIdParam;