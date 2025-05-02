import { Empresa } from '../../database/models.js';
import type { Request, Response } from 'express';

const getEmpresaByName = async (req: Request, res: Response): Promise<void> => {
	try {
		const { nome } = req.params;

		if (!nome) {
			res.status(400).json({ message: 'É preciso um nome' });
			return;
		}

		const empresa = await Empresa.findUnique({
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

		if (!empresa) {
			res.status(404).json({ message: 'Nenhuma empresa encontrada' });
			return;
		}

		res.status(200).json(empresa);
	} catch {
		res.status(500).json({ message: 'Erro interno no servidor' });
	}
};

export default getEmpresaByName;
