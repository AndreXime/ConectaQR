import { Empresa } from '../../database/models.js';
import type { Request, Response } from 'express';

const getAllEmpresas = async (req: Request, res: Response): Promise<void> => {
	try {
		const data = await Empresa.findMany({
			select: { nome: true, descricao: true, foto: true },
		});

		res.status(200).json({ data: data });
		return;
	} catch {
		res.status(500).json({ message: 'Erro interno no servidor' });
	}
};
export default getAllEmpresas;
