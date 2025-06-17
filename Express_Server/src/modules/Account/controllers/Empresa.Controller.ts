import EmpresaService from '../services/Empresa.Service.js';
import { HTTPError } from '../../../lib/errors/HTTPError.js';

export default class EmpresaController {
	private EmpresaService = new EmpresaService();

	public getEmpresa = async (req: ExRequest, res: ExResponse) => {
		if (!req.userId) throw new HTTPError(400, 'Não autenticado');
		const empresa = await this.EmpresaService.getEmpresa(req.userId);

		res.status(200).json({ message: 'Sucesso', data: empresa });
	};

	public updateEmpresa = async (req: ExRequest, res: ExResponse) => {
		if (!req.userId) throw new HTTPError(400, 'Não autenticado');

		const empresa = await this.EmpresaService.updateEmpresa(req.userId, req.body, req.file);
		res.status(200).json({ message: 'Atualizado com sucesso', data: empresa });
	};

	public deleteEmpresa = async (req: ExRequest, res: ExResponse) => {
		if (!req.userId) throw new HTTPError(400, 'Não autenticado');

		const result = await this.EmpresaService.deleteEmpresa(req.userId);
		res.status(200).json(result);
	};
}
