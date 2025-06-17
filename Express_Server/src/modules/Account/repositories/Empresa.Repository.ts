import DatabaseModels from '../../../config/Database.js';

export default class EmpresaRepository {
	private Database = DatabaseModels;

	async findByIdWithRelations(empresaId: string) {
		return this.Database.empresa.findUnique({
			where: { id: empresaId },
			include: {
				produtos: {
					select: {
						id: true,
						nome: true,
						preco: true,
						imagemUrl: true,
						categoria: { select: { nome: true } },
					},
				},
				categorias: {
					select: { id: true, nome: true },
				},
			},
		});
	}

	async findById(empresaId: string) {
		return this.Database.empresa.findUnique({
			where: { id: empresaId },
			select: { foto: true, nome: true },
		});
	}

	async update(empresaId: string, data: Record<string, any>) {
		return this.Database.empresa.update({
			where: { id: empresaId },
			data,
		});
	}

	async delete(empresaId: string) {
		return this.Database.empresa.delete({
			where: { id: empresaId },
			select: { nome: true },
		});
	}

	async deleteCategorias(empresaId: string) {
		return this.Database.categoria.deleteMany({ where: { empresaId } });
	}

	async deleteProdutos(empresaId: string) {
		return this.Database.produto.deleteMany({ where: { empresaId } });
	}
}
