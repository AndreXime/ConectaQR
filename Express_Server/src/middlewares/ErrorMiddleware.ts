import { HTTPError } from '../lib/errors/HTTPError.js';
import { HTTPValidationError } from '../lib/errors/HTTPValidationError.js';
import PrismaErrorHandler, { isPrismaError } from '../lib/errors/PrismaErrorHandler.js';

const ErrorHandler = (err: unknown, req: ExRequest, res: ExResponse) => {
    if (res.headersSent) {
        return;
    }

    let status = 500;
    let message = 'Erro interno no servidor';
    let errors: string[] = [];

    if (err instanceof HTTPError) {
        status = err.HTTPCode;
        message = err.message;
    }

    if (isPrismaError(err)) {
        const prismaHandled = PrismaErrorHandler(err);

        status = prismaHandled.status;
        message = prismaHandled.message;
    }

    if (err instanceof HTTPValidationError) {
        status = err.HTTPCode;
        message = err.message;
        errors = err.Errors;
    }

    res.status(status).json({ message, errors }).end();
    return;
};

export default ErrorHandler;
