type Empresa = {
	nome: string;
	email?: string;
	senha?: string;

	descricao?: string;
	tema: string;
	maps?: string;
	contato?: string;
};

type EmpresaCompleta = {
	nome: string;
	email?: string;
	senha?: string;
	descricao?: string;
	tema: string;
	maps?: string;
	telefone?: string;
	instagram?: string;
	emailContato?: string;
	categorias: Categorias[];
	produtos: Produtos[];
};

type Categorias = {
	id: string;
	nome: string;
};

type Produtos = {
	id: string;
	nome: string;
	preco: string;
	categoria: { nome: string };
	imagemUrl: string;
};

export type { Empresa, Categorias, Produtos, EmpresaCompleta };
