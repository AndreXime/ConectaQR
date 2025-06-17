import SchemaValidator from '../../../lib/validation/SchemaValidator.js';
import SchemaFactory from '../../../lib/validation/SchemaFactory.js';

export interface CreateProdutoDTO {
	nome: string;
	preco: string;
	categoriaId: string;
}

const schemaCreateProduto = {
	nome: SchemaFactory.string().required(),
	preco: SchemaFactory.string().required(),
	categoriaId: SchemaFactory.string().required(),
};

export const validateProduto = SchemaValidator.Handler<CreateProdutoDTO>(schemaCreateProduto);
