type EmpresaPublica = {
	nome: string;
	descricao?: string;
	tema: string;

	maps?: string;
	telefone?: string;
	instagram?: string;
	emailContato?: string;
};

type EmpresaPrivate = {
	nome: string;
	email?: string;

	descricao?: string;
	tema: string;
	maps?: string;
	telefone?: string;
	instagram?: string;
	emailContato?: string;
	categorias: Categoria[];
	produtos: Produto[];
};

type Categoria = {
	id?: string;
	nome: string;
};

type Produto = {
	id: string;
	nome: string;
	preco: string;
	categoria: { nome: string };
	imagemUrl: string;
};

export type { EmpresaPublica, Categoria, Produto, EmpresaPrivate };
