import SchemaValidator from '../../../lib/validation/SchemaValidator.js';
import SchemaFactory from '../../../lib/validation/SchemaFactory.js';

export interface CreateProdutoFinalDTO {
    nome: string;
    preco: string;
    categoriaId: string;
    imagemUrl: string;
}

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

export const validateCreateProduto = SchemaValidator.Handler<CreateProdutoDTO>(schemaCreateProduto);

export interface UpdateProdutoDTO {
    nome: string;
    preco: string;
    categoriaId: string;
    produtoId: string;
}

const schemaUpdateProduto = {
    nome: SchemaFactory.string().required(),
    preco: SchemaFactory.string().required(),
    categoriaId: SchemaFactory.string().required(),
    produtoId: SchemaFactory.string().required(),
};

export const validateUpdateProduto = SchemaValidator.Handler<UpdateProdutoDTO>(schemaUpdateProduto);
