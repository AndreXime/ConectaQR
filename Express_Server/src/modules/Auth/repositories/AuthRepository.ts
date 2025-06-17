import DatabaseModels from '../../../config/Database.js';
import { CreateUserDTO } from '../dto/CreateUserDTO.js';

export default class AuthRepository {
	private Auth = DatabaseModels.empresa;

	public async UserExists(email: string) {
		return await this.Auth.findUnique({ where: { email }, select: { id: true } });
	}

	public async Create({ email, senha, nome, descricao }: CreateUserDTO) {
		return await this.Auth.create({
			data: { email, senha, nome, descricao },
			select: { id: true },
		});
	}

	public async Find(email: string) {
		return await this.Auth.findUnique({ where: { email }, select: { senha: true, id: true } });
	}
}
