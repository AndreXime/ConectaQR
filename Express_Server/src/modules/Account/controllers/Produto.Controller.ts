import ProdutoService from '../services/Produto.Service.js';
import { validateProduto } from '../dto/ProdutoDTO.js';
import { HTTPError } from '../../../lib/errors/HTTPError.js';

export default class AuthController {
	private Service = new ProdutoService();

	public createProduto = async (req: ExRequest, res: ExResponse) => {
		if (!req.userId) throw new HTTPError(400, 'Não autenticado');

		const produto = await this.Service.createProduto(req.userId, req.body, req.file);
		res.status(200).json({ message: 'Produto adicionado!', data: produto });
	};

	public updateProduto = async (req: ExRequest, res: ExResponse) => {
		if (!req.userId) throw new HTTPError(400, 'Não autenticado');
		const produto = await this.Service.updateProduto(req.userId, req.body, req.file);
		res.status(200).json({ message: 'Produto atualizado com sucesso', data: produto });
	};

	public deleteProduto = async (req: ExRequest, res: ExResponse) => {
		const { id: produtoId } = req.params;
		if (!req.userId) throw new HTTPError(400, 'Não autenticado');

		const result = await this.Service.deleteProduto(produtoId, req.userId);
		res.status(200).json(result);
	};
}
