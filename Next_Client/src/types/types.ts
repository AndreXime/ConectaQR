type Empresa = {
	nome: string;
	email?: string;
	senha?: string;

	descricao?: string;
	descricaoCurta?: string;
	tema?: string;
	maps?: string;
	contato?: string;
};

type EmpresaCompleta = {
	nome: string;
	email?: string;
	senha?: string;
	descricao?: string;
	descricaoCurta?: string;
	tema?: string;
	maps?: string;
	contato?: string;
	categorias: Categorias[];
	produtos: Produtos[];
};

type Categorias = {
	nome: string;
};

type Produtos = {
	nome: string;
	preco: string;
	imagem: string;
};

export type { Empresa, Categorias, Produtos, EmpresaCompleta };
