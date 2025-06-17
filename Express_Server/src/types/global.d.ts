import type { Request, Response, NextFunction } from 'express';

declare global {
	type ExRequest = Request;
	type ExResponse = Response;
	type ExNextFunction = NextFunction;
}

export {}; // Isso impede que o arquivo seja tratado como um módulo com escopo próprio.
