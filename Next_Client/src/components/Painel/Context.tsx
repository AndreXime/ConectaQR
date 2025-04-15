'use client';
import { Categoria, EmpresaPrivate, Produto } from '@/lib/types';
import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface EmpresaPainelType {
	Tab: string;
	setTab: Dispatch<SetStateAction<string>>;
	Empresa: EmpresaPrivate;
	setEmpresa: Dispatch<SetStateAction<EmpresaPrivate>>;
	ProdutosData: Produto[];
	Categorias: Categoria[];
	setProdutosData: Dispatch<SetStateAction<Produto[]>>;
	setCategorias: Dispatch<SetStateAction<Categoria[]>>;
	EmpresaTema: string;
	EmpresaNome: string;
	ProdutoECategoriaQTD: { Pqtd: number; Cqtd: number };
}

interface Props {
	children: React.ReactNode;
	initialData: EmpresaPrivate;
}

const EmpresaPainel = createContext<EmpresaPainelType | undefined>(undefined);

export const EmpresaContext = ({ children, initialData }: Props) => {
	const [Tab, setTab] = useState('Inicio');
	const [Empresa, setEmpresa] = useState(initialData);
	const [ProdutosData, setProdutosData] = useState(initialData.produtos);
	const [Categorias, setCategorias] = useState(initialData.categorias);
	const ProdutoECategoriaQTD = { Pqtd: ProdutosData.length, Cqtd: Categorias.length };

	return (
		<EmpresaPainel.Provider
			value={{
				Tab,
				setTab,
				Empresa,
				setEmpresa,
				ProdutosData,
				setProdutosData,
				Categorias,
				setCategorias,
				// Tem componentes que usam exatamente essa informação, então para evitar chama Empresa completa criar esse atributos
				EmpresaTema: Empresa.tema,
				EmpresaNome: Empresa.nome,
				ProdutoECategoriaQTD,
			}}>
			{children}
		</EmpresaPainel.Provider>
	);
};
export const useEmpresa = () => {
	const context = useContext(EmpresaPainel);
	if (!context) throw new Error('useProdutos deve ser usado dentro do ProdutosProvider');
	return context;
};
