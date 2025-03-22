import type { Request, Response, NextFunction } from 'express';
import { validateExtraFields, validateEmail, validateString, validateNumber } from './validateFunctions.js';

type SchemaNomes = 'RegistrarEmpresa' | 'Produtos' | 'LoginEmpresa' | 'UpdateEmpresa' | 'Categoria';

type SchemaType = Record<string, (data: Record<string, unknown>) => string[]>;

export default function validateInput(schemaNome: SchemaNomes) {
	return (req: Request, res: Response, next: NextFunction): void => {
		const schema = schemas[schemaNome];

		if (!req.body || typeof req.body !== 'object') {
			res.status(400).json({ message: 'A requisição deve ser um objeto válido.' });
			return;
		}
		try {
			const errors = schema(req.body);
			if (errors.length > 0) {
				res.status(400).json({ message: errors.join(' - ') });
				return;
			}
		} catch {
			res.status(400).json({ message: 'Erro ao validar os dados' });
			return;
		}
		next();
	};
}

const schemas: SchemaType = {
	RegistrarEmpresa: (data) => [
		...validateExtraFields(data, ['email', 'senha', 'nome', 'descricao']),
		...validateEmail('email', data.email),
		...validateString('senha', data.senha, 6),
		...validateString('nome', data.nome, 6),
		...validateString('descricao', data.descricao, 20),
	],
	LoginEmpresa: (data) => [
		...validateExtraFields(data, ['email', 'senha']),
		...validateEmail('email', data.email),
		...validateString('senha', data.senha, 6),
	],
	UpdateEmpresa: (data) => [
		...validateExtraFields(data, [
			'nome',
			'senha',
			'email',
			'descricao',
			'tema',
			'maps',
			'instagram',
			'telefone',
			'emailContato',
			'cidade',
			'imagem',
		]),
		...validateEmail('email', data.email, false),
		...validateString('senha', data.senha, 6, true),
		...validateString('nome', data.nome, 6, false),
		...validateString('descricao', data.descricao, 20, true),
	],
	Produtos: (data) => [
		...validateExtraFields(data, ['nome', 'preco', 'categoria', 'imagem']),
		...validateString('nome', data.nome, 6),
		...validateNumber('preco', data.preco),
		...validateString('categorias', data.categorias, 6),
	],
	Categoria: (data) => [...validateExtraFields(data, ['nome', 'categoriaId']), ...validateString('nome', data.nome, 3)],
};
