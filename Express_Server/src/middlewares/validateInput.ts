import type { Request, Response, NextFunction } from "express";

type SchemaNomes = "RegistrarEmpresa" | "Produtos" | "LoginEmpresa" | "UpdateEmpresa";

type ValidationFunction = (data: Record<string, unknown>) => string[];

type SchemaType = Record<string, ValidationFunction>;

export default function validateInput(schemaNome: SchemaNomes) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const schema = schemas[schemaNome];

    if (!req.body || typeof req.body !== "object") {
      res.status(400).json({ message: "A requisição deve ser um objeto válido." });
      return;
    }

    try {
      const errors = schema(req.body);
      if (errors.length > 0) {
        res.status(400).json({ message: errors });
        return;
      }
    } catch {
      res.status(400).json({ message: "Erro ao validar os dados" });
      return;
    }
    next();
  };
}

const validateString = (field: string, value: unknown, minLength = 1, optional = false): string[] => {
  if (optional && !value) {
    return [];
  }
  if (typeof value !== "string") {
    return [`O campo '${field}' deve ser um texto.`];
  } else if (value.trim().length < minLength) {
    return [`O campo '${field}' deve ter no mínimo ${minLength} caracteres.`];
  }
  return [];
};

const validateEmail = (field: string, value: unknown, optional = false): string[] => {
  if (optional && !value) {
    return [];
  }
  const errors = validateString(field, value, 1);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof value === "string" && !emailRegex.test(value.trim())) {
    errors.push(`O campo '${field}' deve ser um e-mail válido.`);
  }
  return errors;
};

const validateNumber = (field: string, value: unknown): string[] => {
  if (typeof value !== "number" || isNaN(value)) {
    return [`O campo '${field}' deve ser um número válido.`];
  }
  return [];
};

const validateExtraFields = (data: Record<string, unknown>, allowedFields: string[]): string[] => {
  try {
    if (data) {
      const extraFields = Object.keys(data).filter((key) => !allowedFields.includes(key));
      return extraFields.map((key) => `O campo '${key}' não é permitido.`);
    }
    throw Error;
  } catch {
    return ["Nenhum campo encontrado"];
  }
};

const schemas: SchemaType = {
  RegistrarEmpresa: (data) => [
    ...validateExtraFields(data, ["email", "senha", "nome", "descricaoCurta"]),
    ...validateEmail("email", data.email),
    ...validateString("senha", data.senha, 6),
    ...validateString("nome", data.nome, 6),
    ...validateString("descricaoCurta", data.descricaoCurta, 20)
  ],
  LoginEmpresa: (data) => [
    ...validateExtraFields(data, ["email", "senha"]),
    ...validateEmail("email", data.email),
    ...validateString("senha", data.senha, 6)
  ],
  UpdateEmpresa: (data) => [
    ...validateExtraFields(data, ["nome", "senha", "email", "descricao", "descricaoCurta", "tema"]),
    ...validateEmail("email", data.email, true),
    ...validateString("senha", data.senha, 6, true),
    ...validateString("nome", data.nome, 6, true),
    ...validateString("descricao", data.descricao, 20, true),
    ...validateString("descricaoCurta", data.descricaoCurta, 10, true),
    ...validateString("tema", data.tema, 1, true)
  ],
  Produtos: (data) => [
    ...validateExtraFields(data, ["nome", "preco", "categorias", "imagem"]),
    ...validateString("nome", data.nome, 6),
    ...validateNumber("preco", data.preco),
    ...validateString("categorias", data.categorias, 6),
    ...validateString("imagem", data.imagem, 6)
  ]
};
