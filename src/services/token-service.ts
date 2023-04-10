import jwt from 'jsonwebtoken';
import User from '../models/user';
import TokenOutputDTO from '../dtos/auth/token-output-dto';
import Role from '../models/role';

class TokenService {

    public makeToken(user: User, roles: Role[]): TokenOutputDTO {
        const accessToken = jwt.sign(
            {
                username: user.email,
                roles: roles.map((role) => role.authority)
            },
            process.env.ACCESS_TOKEN_SECRET || '123',
            { expiresIn: '1d' }
        );
        return {
            access_token: accessToken
        }
    }
}

const tokenService = new TokenService;
export default tokenService;