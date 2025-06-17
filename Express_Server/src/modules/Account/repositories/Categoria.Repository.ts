import DatabaseModels from '../../../config/Database.js';

export default class CategoriaRepository {
	private Database = DatabaseModels;

	async create(nome: string, empresaId: string) {
		return this.Database.categoria.create({
			data: { nome, Empresa: { connect: { id: empresaId } } },
			select: { id: true, nome: true },
		});
	}

	async update(categoriaId: string, nome: string, empresaId: string) {
		return this.Database.categoria.update({
			where: { id: categoriaId, empresaId },
			data: { nome },
			select: { id: true, nome: true },
		});
	}

	async delete(categoriaId: string, empresaId: string) {
		return this.Database.categoria.delete({
			where: { id: categoriaId, empresaId },
		});
	}

	async findById(id: string) {
		return this.Database.categoria.findUnique({
			where: { id },
			select: { id: true, nome: true },
		});
	}

	async reassignProducts(oldCategoriaId: string, newCategoriaId: string, empresaId: string) {
		return this.Database.produto.updateMany({
			where: { categoriaId: oldCategoriaId, empresaId },
			data: { categoriaId: newCategoriaId },
		});
	}
}
