import type { Request, Response, NextFunction } from "express";

type SchemaNomes = "EmpresaRegistrar" | "Produtos" | "EmpresaLogin";

type ValidationFunction = (data: Record<string, unknown>) => string[];

type SchemaType = Record<string, ValidationFunction>;

export default function validateInput(schemaNome: SchemaNomes) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const schema = schemas[schemaNome];
    const errors = schema(req.body);
    if (errors.length > 0) {
      res.status(400).json({ message: errors });
      return;
    }
    next();
  };
}

const validateString = (field: string, value: string | unknown, minLength = 1): string[] => {
  if (typeof value !== "string") {
    return [`O campo '${field}' deve ser um texto.`];
  } else if (value.trim().length < minLength) {
    return [`O campo '${field}' deve ter no mínimo ${minLength} caracteres.`];
  }
  return [];
};

const validateEmail = (field: string, value: string | unknown): string[] => {
  const errors = validateString(field, value, 1);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof value === "string" && !emailRegex.test(value.trim())) {
    errors.push(`O campo '${field}' deve ser um e-mail válido.`);
  }
  return errors;
};

const validateNumber = (field: string, value: number | unknown): string[] => {
  if (typeof value !== "number" || isNaN(value)) {
    return [`O campo '${field}' deve ser um número válido.`];
  }
  return [];
};

const validateExtraFields = (data: object, allowedFields: string[]): string[] => {
  return Object.keys(data)
    .filter((key) => !allowedFields.includes(key))
    .map((key) => `O campo '${key}' não é permitido.`);
};

const schemas: SchemaType = {
  EmpresaRegistrar: (data) => [
    ...validateExtraFields(data, ["email", "senha", "nome", "descricao"]),
    ...validateEmail("email", data.email),
    ...validateString("senha", data.senha, 6),
    ...validateString("nome", data.nome, 6),
    ...validateString("descricao", data.descricao, 20)
  ],
  EmpresaLogin: (data) => [
    ...validateExtraFields(data, ["email", "senha"]),
    ...validateEmail("email", data.email),
    ...validateString("senha", data.senha, 6)
  ],
  Produtos: (data) => [
    ...validateExtraFields(data, ["nome", "preco", "categorias", "imagem"]),
    ...validateString("nome", data.nome, 6),
    ...validateNumber("preco", data.preco),
    ...validateString("categorias", data.categorias, 6),
    ...validateString("imagem", data.imagem, 6)
  ]
};
