import PublicRepository from '../repositories/PublicRepository.js';
import { HTTPError } from '../../../lib/errors/HTTPError.js';
import { ParamsDTO } from '../dto/paramsDTO.js';
import { ProductQuery, ProdutoPublic } from '../dto/ProductsInterface.js';

export default class PublicService {
	private PublicRepository = new PublicRepository();

	public FindAll = async () => {
		return await this.PublicRepository.FindAllEmpresa();
	};

	public FindPublicEmpresaData = async (nome: string) => {
		const data = await this.PublicRepository.FindEmpresaUnique(nome);
		if (!data) {
			throw new HTTPError(404, 'Nenhuma empresa encontrada');
		}
		return data;
	};

	public GetProdutos = async (params: ParamsDTO) => {
		const empresaData = await this.PublicRepository.findEmpresaByName(params.empresa);
		if (!empresaData) {
			throw new HTTPError(404, 'Não existe empresa com esse nome');
		}

		const categorias = await this.PublicRepository.findCategoriesByCompany(params.empresa);

		let produtos: ProdutoPublic[];
		let count = 0;
		const limitePorPagina = 20;

		if (params.categoria || params.search || params.page) {
			// consulta paginada
			const baseWhere: ProductQuery['where'] = { empresa: { nome: params.empresa } };
			if (params.categoria) baseWhere.categoria = { nome: params.categoria };
			if (params.search) baseWhere.nome = { contains: params.search, mode: 'insensitive' };

			const query: ProductQuery = {
				where: baseWhere,
				skip: (params.page - 1) * limitePorPagina,
				take: limitePorPagina,
			};

			[produtos, count] = await Promise.all([
				this.PublicRepository.findProductsPaginated(query),
				this.PublicRepository.countProducts(baseWhere),
			]);
		} else {
			// home: 5 por categoria
			const produtosPorCategoria = await Promise.all(
				categorias.map((cat) => this.PublicRepository.findProductsByCategoryHome(params.empresa, cat.nome, 5))
			);
			produtos = produtosPorCategoria.flat();
			count = 0;
		}

		return {
			data: { produtos, categorias },
			pagination: {
				PaginaAtual: params.page,
				limitePorPagina,
				ProdutosTotal: count,
				PaginasTotais: Math.ceil(count / limitePorPagina),
			},
			tema: empresaData.tema,
		};
	};
}
