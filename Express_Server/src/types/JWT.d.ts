import type { JwtPayload } from 'jsonwebtoken';

export interface DecodedToken extends JwtPayload {
	userId: string;
}

declare module 'express' {
	interface Request {
		userId?: string; // Adiciona a request userId
	}
}
