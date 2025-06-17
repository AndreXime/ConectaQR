import HashManager from '../../../lib/security/HashManager.js';
import AuthMiddleware from '../../../middlewares/AuthMiddleware.js';
import AuthRepository from '../repositories/AuthRepository.js';
import { HTTPError } from '../../../lib/errors/HTTPError.js';
import { CreateUserDTO } from '../dto/CreateUserDTO.js';
import { LoginUserDTO } from '../dto/LoginUserDTO.js';

export default class AuthService {
	private userRepository = new AuthRepository();

	public CreateUser = async ({ email, senha, nome, descricao }: CreateUserDTO) => {
		if (await this.userRepository.UserExists(email)) {
			throw new HTTPError(400, 'Uma empresa já existe nesse email');
		}

		nome = nome.toLowerCase().replace(/\s+/g, '-');
		senha = await HashManager.Hash(senha);
		try {
			const empresa = await this.userRepository.Create({ email, senha, nome, descricao });
			const token = AuthMiddleware.generateToken(empresa.id);

			return token;
		} catch {
			throw new HTTPError(400, 'Uma empresa já existe com esse email');
		}
	};

	public LoginUser = async ({ email, senha }: LoginUserDTO) => {
		const empresa = await this.userRepository.Find(email);
		if (!empresa || !(await HashManager.verifyHash(empresa.senha, senha))) {
			throw new HTTPError(400, 'Credenciais inválidas');
		}
		const token = AuthMiddleware.generateToken(empresa.id);

		return token;
	};
}
