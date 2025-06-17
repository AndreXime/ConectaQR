export interface ProdutoPublic {
	categoria: {
		nome: string;
	};
	nome: string;
	preco: string;
	imagemUrl: string;
}
export interface ProductQuery {
	where: {
		empresa: { nome: string };
		categoria?: { nome: string };
		nome?: { contains: string; mode: 'insensitive' };
	};
	skip?: number;
	take?: number;
}
