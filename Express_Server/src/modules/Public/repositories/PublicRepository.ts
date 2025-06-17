import DatabaseModels from '../../../config/Database.js';
import { ProductQuery } from '../dto/ProductsInterface.js';

export default class PublicRepository {
	private Public = DatabaseModels;

	public async FindAllEmpresa() {
		return await this.Public.empresa.findMany({
			select: { nome: true, descricao: true, foto: true },
		});
	}

	public async findEmpresaByName(nome: string) {
		return await this.Public.empresa.findUnique({
			where: { nome },
			select: { tema: true },
		});
	}

	public async FindEmpresaUnique(nome: string) {
		return await this.Public.empresa.findUnique({
			where: { nome },
			select: {
				nome: true,
				descricao: true,
				tema: true,
				maps: true,
				telefone: true,
				instagram: true,
				emailContato: true,
				cidade: true,
				foto: true,
			},
		});
	}

	public findCategoriesByCompany = async (empresaNome: string) => {
		return await this.Public.categoria.findMany({
			where: { Empresa: { nome: empresaNome } },
			select: { nome: true },
		});
	};

	public countProducts = async (where: ProductQuery['where']) => {
		return await this.Public.produto.count({ where });
	};

	public findProductsPaginated = async (query: ProductQuery) => {
		return await this.Public.produto.findMany({
			where: query.where,
			select: {
				nome: true,
				preco: true,
				imagemUrl: true,
				categoria: { select: { nome: true } },
			},
			skip: query.skip,
			take: query.take,
		});
	};

	public findProductsByCategoryHome = async (empresaNome: string, categoriaNome: string, limit: number) => {
		return await this.Public.produto.findMany({
			where: {
				empresa: { nome: empresaNome },
				categoria: { nome: categoriaNome },
			},
			select: {
				nome: true,
				preco: true,
				imagemUrl: true,
				categoria: { select: { nome: true } },
			},
			take: limit,
		});
	};
}
