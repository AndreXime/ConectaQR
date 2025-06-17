import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import type { DecodedToken } from '../types/JWT.js';
import { HTTPError } from '../lib/errors/HTTPError.js';

class AuthMiddleware {
	private static secretKey = process.env.JWT_KEY || 'nZz87qv5CRKn63o0IBa3';

	public async generateToken(userId: string) {
		const payload = { userId };
		const token = jwt.sign(payload, AuthMiddleware.secretKey, { expiresIn: '1h' }); // Token expira em 1 hora
		return token;
	}

	public async verifyAuth(req: Request, res: Response, next: NextFunction) {
		try {
			let token = req.cookies.token;

			if (!token) token = req.headers['authorization']?.split(' ')[1];

			if (!token) throw new HTTPError(401, 'Não autenticado');

			const decoded = jwt.verify(token, AuthMiddleware.secretKey) as DecodedToken;

			// Define no request o Id para ser usado pelo controller
			req.userId = decoded.userId;
			next();
		} catch (error) {
			if (error instanceof HTTPError) {
				res.status(error.HTTPCode).json({ message: error.message });
				return;
			}

			res.status(401).json({ message: 'Não foi possivel processar o token fornecido' });
			return;
		}
	}
}

export default new AuthMiddleware();
