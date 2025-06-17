import { HTTPError } from '../../../lib/errors/HTTPError.js';

export interface ParamsDTO {
	empresa: string;
	search: string | undefined;
	categoria: string | undefined;
	page: number;
}

interface UntreatedParamsDTO {
	empresa: string;
	search: string | undefined;
	page: string | undefined;
	categoria: string | undefined;
}

export const validateParams = (params: UntreatedParamsDTO): ParamsDTO => {
	const { empresa, search, page, categoria } = params;

	if (!empresa) {
		throw new HTTPError(400, 'Nome da empresa não fornecido');
	}

	const parsedPage = Number(page) || 1;
	if (isNaN(parsedPage) || parsedPage <= 0) {
		throw new HTTPError(400, 'Query page deve ser número positivo');
	}

	return {
		empresa,
		search,
		page: parsedPage,
		categoria,
	};
};
