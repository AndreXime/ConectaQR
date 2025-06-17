import SchemaValidator from '../../../lib/validation/SchemaValidator.js';
import SchemaFactory from '../../../lib/validation/SchemaFactory.js';

export interface CreateUserDTO {
	email: string;
	senha: string;
	nome: string;
	descricao: string;
}

const schemaCreateUser = {
	email: SchemaFactory.required().email(),
	senha: SchemaFactory.required().string().minLength(5),
	nome: SchemaFactory.required().string().minLength(5),
	descricao: SchemaFactory.required().string().minLength(10),
};

export const validateCreateUser = SchemaValidator.Handler<CreateUserDTO>(schemaCreateUser);
