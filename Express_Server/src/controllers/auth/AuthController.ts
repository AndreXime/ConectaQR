import { Request, Response } from 'express';
import { Empresa } from '../../database/models.js';
import { generateToken } from '../../middlewares/index.js';
import argon2 from 'argon2';

const ARGON_SECRET = Buffer.from(process.env.ARGON2_KEY || '123');

const createEmpresa = async (req: Request, res: Response): Promise<void> => {
	try {
		let { email, senha, nome, descricao } = req.body;

		// Nome precisa ser formartado para facilitar ter outras urls com esse nome
		nome = (nome as string).toLowerCase().replace(/\s+/g, '-');

		//Hashing da senha
		senha = await argon2.hash(senha, {
			type: argon2.argon2id, // Tipo mais seguro
			memoryCost: 3 * 1024, // (3 * 1024 KiB) Total ~24MB
			timeCost: 3, // Iterações
			parallelism: 1, // Paralelismo mínimo para menor uso de CPU
			secret: ARGON_SECRET,
		});

		const empresa = await Empresa.create({
			data: { email, senha, nome, descricao },
			select: { id: true },
		});

		const token = generateToken(empresa.id);
		res.cookie('token', token, {
			maxAge: 2 * 60 * 60 * 1000,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			domain: process.env.DOMAIN,
			sameSite: 'lax',
		});
		res.status(200).json({ message: 'Sucesso' });
	} catch (error) {
		res.status(400).json({ message: 'Essa empresa já existe' });
	}
};

const loginEmpresa = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, senha } = req.body;

		const empresa = await Empresa.findUnique({ where: { email }, select: { id: true, senha: true } });

		const credenciaisValidas =
			empresa &&
			(await argon2.verify(empresa.senha, senha, {
				secret: ARGON_SECRET,
			}));

		if (!credenciaisValidas) {
			res.status(400).json({ message: 'Credenciais inválidas' + senha + empresa?.senha });
			return;
		}

		const token = generateToken(empresa.id);
		res.cookie('token', token, {
			maxAge: 2 * 60 * 60 * 1000,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			domain: process.env.DOMAIN,
			sameSite: 'lax',
		});
		res.status(200).json({ message: 'Sucesso' });
	} catch (error) {
		res.status(400).json({ message: 'Error no servidor', error });
	}
};

export default {
	loginEmpresa,
	createEmpresa,
};
