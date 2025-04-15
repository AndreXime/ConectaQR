import type { Dispatch, SetStateAction } from 'react';

interface EmpresaPublica {
	nome: string;
	descricao?: string;
	tema: string;
	maps?: string;
	telefone?: string;
	instagram?: string;
	emailContato?: string;

	foto?: string;
	cidade?: string;
}

interface EmpresaPrivate extends EmpresaPublica {
	email?: string;

	categorias: Categoria[];
	produtos: Produto[];
}

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

type ProdutoPageProps = {
	data?: {
		produtos: Produto[];
		categorias: Categoria[];
	};
	pagination?: { PaginaAtual: number; limitePorPagina: number; ProdutosTotal: number; PaginasTotais: number };
	tema?: string;
};

type TabProdutosProps = {
	Produtos: Produto[];
	Categorias: Categoria[];
	setProdutos: Dispatch<SetStateAction<Produto[]>>;
	setCategorias: Dispatch<SetStateAction<Categoria[]>>;
};

export type { EmpresaPublica, Categoria, Produto, EmpresaPrivate, ProdutoPageProps, TabProdutosProps };
