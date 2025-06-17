import { HTTPError } from '../../../lib/errors/HTTPError.js';
import CategoriaRepository from '../repositories/Categoria.Repository.js';

export default class CategoriaService {
	private repository: CategoriaRepository;

	constructor() {
		this.repository = new CategoriaRepository();
	}

	async create(nome: string, empresaId: string) {
		if (!nome) throw new Error('Nome da categoria é obrigatório');
		return this.repository.create(nome, empresaId);
	}

	async update(categoriaId: string, nome: string, empresaId: string) {
		if (!nome) throw new Error('Nome da categoria é obrigatório');
		return this.repository.update(categoriaId, nome, empresaId);
	}

	async delete(categoriaId: string, newCategoriaId: string, empresaId: string) {
		if (categoriaId === newCategoriaId) {
			throw new HTTPError(400, 'Os IDs passados são iguais');
		}

		const novaCategoria = await this.repository.findById(newCategoriaId);
		if (!novaCategoria) {
			throw new HTTPError(400, 'O ID da nova categoria não existe');
		}

		await this.repository.reassignProducts(categoriaId, newCategoriaId, empresaId);
		await this.repository.delete(categoriaId, empresaId);

		return novaCategoria;
	}
}
