import { Request, Response } from 'express';
import { Empresa } from '../../database/models.js';
import { generateToken } from '../../middlewares/index.js';
import argon2 from 'argon2';

const ARGON_SECRET = Buffer.from(process.env.ARGON2_KEY || '123');

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

export default loginEmpresa;
