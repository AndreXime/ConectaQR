import SchemaValidator from '../../../lib/validation/SchemaValidator.js';
import SchemaFactory from '../../../lib/validation/SchemaFactory.js';

export interface UpdateEmpresaDTO {
    nome: string;
    email: string;
    senha?: string;
    descricao?: string;
    tema?: string;
    maps?: string;
    instagram?: string;
    telefone?: string;
    emailContato?: string;
    cidade?: string;
    foto?: string;
}

const schemaUpdateEmpresa = {
    nome: SchemaFactory.string(),
    senha: SchemaFactory.string(),
    email: SchemaFactory.string(),
    descricao: SchemaFactory.string(),
    tema: SchemaFactory.string(),
    maps: SchemaFactory.string(),
    instagram: SchemaFactory.string(),
    telefone: SchemaFactory.string(),
    emailContato: SchemaFactory.string(),
    cidade: SchemaFactory.string(),
    foto: SchemaFactory.string(),
};

export const validateUpdateEmpresa = SchemaValidator.Handler<UpdateEmpresaDTO>(schemaUpdateEmpresa);
