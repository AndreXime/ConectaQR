import AuthService from '../services/Auth.Service.js';
import { validateCreateUser } from '../dto/CreateUserDTO.js';
import { validateLoginUser } from '../dto/LoginUserDTO.js';

export default class AuthController {
    private AuthService = new AuthService();

    public Register = async (req: ExRequest, res: ExResponse) => {
        const data = validateCreateUser(req.body);

        const token = await this.AuthService.CreateUser(data);

        res.cookie('token', token, {
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            domain: process.env.DOMAIN,
            sameSite: 'lax',
        });

        res.status(200).json({ message: 'Conta criada com sucesso' });
    };

    public Login = async (req: ExRequest, res: ExResponse) => {
        const data = validateLoginUser(req.body);

        const token = await this.AuthService.LoginUser(data);

        res.cookie('token', token, {
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            domain: process.env.DOMAIN,
            sameSite: 'lax',
        });

        res.status(200).json({ message: 'Conta logada com sucesso' });
    };
}
