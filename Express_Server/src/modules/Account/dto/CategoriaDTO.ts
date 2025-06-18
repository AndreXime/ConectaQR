import SchemaFactory from '../../../lib/validation/SchemaFactory.js';
import SchemaValidator from '../../../lib/validation/SchemaValidator.js';

export interface CreateCategoriaDTO {
	nome: string;
}

export interface UpdateCategoriaDTO {
	nome: string;
	categoriaId: string;
}

export interface DeleteCategoriaDTO {
	id: string;
	newId: string;
}

const schemaCreateCategoria = {
	nome: SchemaFactory.string().required(),
};

const schemaUpdateCategoria = {
	nome: SchemaFactory.string().required(),
	categoriaId: SchemaFactory.string().required(),
};

const schemaDeleteCategoria = {
	id: SchemaFactory.string().required(),
	newId: SchemaFactory.string().required(),
};

export const validateCreateCategoria = SchemaValidator.Handler<CreateCategoriaDTO>(schemaCreateCategoria);
export const validateUpdateCategoria = SchemaValidator.Handler<UpdateCategoriaDTO>(schemaUpdateCategoria);
export const validateDeleteCategoria = SchemaValidator.Handler<DeleteCategoriaDTO>(schemaDeleteCategoria);
