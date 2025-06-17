import SchemaValidator from '../../../lib/validation/SchemaValidator.js';
import SchemaFactory from '../../../lib/validation/SchemaFactory.js';

export interface LoginUserDTO {
	email: string;
	senha: string;
}

const schemaLoginUser = {
	email: SchemaFactory.email().required(),
	senha: SchemaFactory.string().minLength(5).required(),
};

export const validateLoginUser = SchemaValidator.Handler<LoginUserDTO>(schemaLoginUser);
