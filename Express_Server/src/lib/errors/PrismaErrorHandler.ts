import { Prisma } from '../../../prisma/client/client.js';

export function isPrismaError(err: unknown) {
	return (
		err instanceof Prisma.PrismaClientKnownRequestError ||
		err instanceof Prisma.PrismaClientValidationError ||
		err instanceof Prisma.PrismaClientInitializationError ||
		err instanceof Prisma.PrismaClientRustPanicError
	);
}

type PrismaError =
	| Prisma.PrismaClientKnownRequestError
	| Prisma.PrismaClientValidationError
	| Prisma.PrismaClientInitializationError
	| Prisma.PrismaClientRustPanicError;

export default function PrismaErrorHandler(err: PrismaError) {
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		switch (err.code) {
			case 'P2002':
				return {
					status: 409,
					message: `Valor único já existe no campo ${err.meta?.target}`,
				};
			case 'P2025':
				return {
					status: 404,
					message: 'Registro não encontrado',
				};
			default:
				return {
					status: 400,
					message: 'Erro de banco de dados',
				};
		}
	}

	if (err instanceof Prisma.PrismaClientValidationError) {
		return { status: 400, message: 'Erro de validação na query do Prisma' };
	}

	if (err instanceof Prisma.PrismaClientInitializationError || err instanceof Prisma.PrismaClientRustPanicError) {
		return { status: 500, message: 'Erro interno no banco de dados' };
	}

	return { status: 500, message: 'Erro interno no banco de dados' };
}
