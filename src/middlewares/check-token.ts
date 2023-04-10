import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import UnauthorizedEror from '../errors/unauthorized-error';
import userService from '../services/user-service';
import CustomRequest from '../interfaces/custom-request';

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;
    if(authHeaders && authHeaders.startsWith("Bearer ")) {
        const token = authHeaders.substring(7);
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '')
            const { username } = (decoded as JwtPayload);
            const user = await userService.findUser(username);
            (req as CustomRequest).username = user.email;
            (req as CustomRequest).roles = user.roles.map((role) => role.authority);
            return next();
        }
        catch(e) {
            next(new UnauthorizedEror())
        }  
    }
    else {
        next(new UnauthorizedEror())
    }
}

export default checkToken;
