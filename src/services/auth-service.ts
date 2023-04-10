import { Transaction, Op } from "sequelize";
import conn from "../db/conn";
import User from "../models/user";
import Role from "../models/role";
import bcrypt from 'bcrypt';
import RegisterInputDTO from "../dtos/auth/register-input-dto";
import BadRequestError from "../errors/bas-request-error";
import TokenOutputDTO from "../dtos/auth/token-output-dto";
import tokenService from "./token-service";
import LoginInputDTO from "../dtos/auth/login-input-dto";
import UserNotFoundError from "../errors/user-not-found-error";
import userService from "./user-service";

class AuthService {

    public async register(registerInputDTO: RegisterInputDTO): Promise<TokenOutputDTO> {
        const transaction: Transaction = await conn.transaction();
        let user: User;
        let roles: Array<Role>
        try {
            const hashed = await bcrypt.hash(registerInputDTO.password, 10);
            user = await User.create({
                email: registerInputDTO.email,
                password: hashed
            }, { transaction: transaction });
            roles = await Role.findAll({
                where: {
                    id: { [Op.in]: registerInputDTO.rolesIds }
                }
            });
            if(roles.length === 0) {
                throw new BadRequestError('Invalid roleIds');
            }
            await user.$set('roles', roles, { transaction: transaction });
            await transaction.commit();
        }
        catch(e) {
            await transaction.rollback();
            throw e;
        }

        return tokenService.makeToken(user, roles);
    }

    public async login(loginInputDTO: LoginInputDTO): Promise<TokenOutputDTO> {
        try {
            const user = await userService.findUser(loginInputDTO.email);
            const match: boolean = await bcrypt.compare(loginInputDTO.password, user.password);
            if(!match) {
                throw new BadRequestError('User or password are invalid');
            }
            return tokenService.makeToken(user, user.roles);
        }
        catch(e) {
            if(e instanceof UserNotFoundError) {
                throw new BadRequestError('User or password are invalid');
            }
            throw e;
        }
    }
}

const authService = new AuthService();
export default authService;