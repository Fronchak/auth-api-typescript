import { NextFunction, Request, Response } from "express"
import CustomRequest from "../interfaces/custom-request";
import ForbiddenError from "../errors/forbiddon-error";

const checkRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRoles: Array<string> = (req as CustomRequest).roles;
        const isAuthorized = userRoles.find((role) => roles.includes(role));
        if(!isAuthorized) {
            return next(new ForbiddenError())
        }
        return next();
    }
}

export default checkRoles;