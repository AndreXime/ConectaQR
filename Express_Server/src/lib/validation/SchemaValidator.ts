import { HTTPError } from '../errors/HTTPError.js';
import { HTTPValidationError } from '../errors/HTTPValidationError.js';

import Validator from './SchemaFactory.js';

type Schema<T> = {
    [K in keyof T]: Validator;
};

/**
 * Factory para criar uma função de validação com base no schema.
 */
export default class SchemaValidator {
    static Handler<T>(schema: Schema<T>) {
        return (data: T) => {
            const errors: string[] = [];
            const validatedData: Partial<T> = {};

            if (!data || !(typeof data == 'object')) {
                throw new HTTPError(400, 'Não foi fornecido nenhum dado valido');
            }

            for (const [key, validator] of Object.entries(schema) as [keyof T, Validator][]) {
                const value = data[key];
                const errs = validator.validate(value);

                if (errs.length) {
                    errors.push(...errs.map((err) => `Erro no campo ${String(key)}: ${err}`));
                } else {
                    validatedData[key] = value;
                }
            }

            if (errors.length) {
                throw new HTTPValidationError(400, 'Erros na validação no dados enviados', errors);
            }

            return validatedData as T;
        };
    }
}
