import SchemaValidator from '../../../lib/validation/SchemaValidator.js';
import SchemaFactory from '../../../lib/validation/SchemaFactory.js';

export interface CreateFeedbackDTO {
	nome: string;
	email: string;
	mensagem: string;
}
const schemaCreateFeedback = {
	nome: SchemaFactory.string().required(),
	email: SchemaFactory.email().required(),
	mensagem: SchemaFactory.string().required(),
};

export const validateCreateFeedback = SchemaValidator.Handler<CreateFeedbackDTO>(schemaCreateFeedback);
