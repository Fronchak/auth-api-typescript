import { Op } from "sequelize";
import User from "../models/user";
import Role from "../models/role";
import UserNotFoundError from "../errors/user-not-found-error";

class UserService {

    public async findUser(email: string): Promise<User> {
        const user = await User.findOne({
            where: {
                'email': {
                    [Op.eq]: email
                }
            },
            include: Role
        });
        if(!user) {
            throw new UserNotFoundError();
        }
        return user;
    }
}

const userService = new UserService();
export default userService;