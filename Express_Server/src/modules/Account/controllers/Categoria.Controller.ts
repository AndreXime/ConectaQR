import CategoriaService from '../services/Categoria.Service.js';
import { HTTPError } from '../../../lib/errors/HTTPError.js';

export default class AuthController {
	private CategoriaService = new CategoriaService();

	public createCategoria = async (req: ExRequest, res: ExResponse) => {
		const { nome } = req.body;
		if (!req.userId) throw new HTTPError(400, 'Não autenticado');

		const categoria = await this.CategoriaService.create(nome, req.userId);

		res.status(200).json({ message: 'Categoria adicionada!', data: categoria });
	};

	public updateCategoria = async (req: ExRequest, res: ExResponse) => {
		const { categoriaId, nome } = req.body;
		if (!req.userId) throw new HTTPError(400, 'Não autenticado');

		const categoria = await this.CategoriaService.update(categoriaId, nome, req.userId);
		res.status(200).json({ message: 'Atualizado com sucesso', data: categoria });
	};

	public deleteCategoria = async (req: ExRequest, res: ExResponse) => {
		const { id, newId } = req.body;
		if (!req.userId) throw new HTTPError(400, 'Não autenticado');

		const categoria = await this.CategoriaService.delete(id, newId, req.userId);
		res.status(200).json({ message: 'Categoria removida com sucesso', data: categoria });
	};
}
