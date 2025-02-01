import type { Request, Response, NextFunction } from "express";
import Joi from "joi";

type SchemaNomes = "Empresa" | "Produtos";

export default function validateInput(schemaNome: SchemaNomes) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const schema = schemas[schemaNome];
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorsAll = error.details.map((detail) => detail.message);
      res.status(400).json({
        message: errorsAll
      });
      return;
    }

    next();
  };
}

const messagensComuns = {
  "string.base": "O campo {#label} deve ser um texto.",
  "string.email": "O campo 'email' deve ser um e-mail válido.",
  "string.min": "O campo '{#label}' deve ter no mínimo {#limit} caracteres.",
  "any.required": "O campo '{#label}' é obrigatório.",
  "string.empty": "O campo '{#label}' não pode estar vazio."
};

// String comuns são Obrigatorias e tem messagens comuns
const stringComum = (customMessages = {}) =>
  Joi.string()
    .required()
    .messages({ ...messagensComuns, ...customMessages });

const numeroComum = (customMessages = {}) =>
  Joi.number()
    .required()
    .messages({ ...messagensComuns, ...customMessages });

const schemas = {
  Empresa: Joi.object({
    email: stringComum({ "string.email": "O campo 'email' deve ser um e-mail válido." }).email(),
    senha: stringComum({ "string.min": "O campo 'senha' deve ter no mínimo 6 caracteres." }).min(6),
    nome: stringComum({ "string.min": "O campo 'senha' deve ter no mínimo 6 caracteres." }).min(6)
  }),
  Produtos: Joi.object({
    nome: stringComum({ "string.email": "O campo 'email' deve ser um e-mail válido." }).email(),
    preco: numeroComum(),
    categorias: stringComum()
  })
};
