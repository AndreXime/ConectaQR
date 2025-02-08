'use client';
import { Drawer, Resumo, Produtos, Editar } from '@/components/Painel';
import { useState } from 'react';
import type { PropsPage } from './page';

export default function App({ initialData }: PropsPage) {
	const [Tab, setTab] = useState('Inicio');
	const [Empresa, setInfoData] = useState(initialData);
	const [ProdutosData, setProdutosData] = useState(initialData.produtos);
	const [Categorias, setCategorias] = useState(initialData.categorias);

	console.log(initialData);

	return (
		<div
			data-theme={Empresa.tema}
			className="min-h-screen">
			<Drawer setTab={setTab}>
				<main className="p-5">
					{Tab === 'Inicio' && (
						<Resumo
							Data={Empresa}
							qtdCategorias={Categorias.length}
							qtdProdutos={ProdutosData.length}
						/>
					)}
					{Tab === 'Editar' && (
						<Editar
							Data={Empresa}
							setInfo={setInfoData}
						/>
					)}
					{Tab === 'Produtos' && (
						<Produtos
							Produtos={ProdutosData || []}
							Categorias={Categorias || []}
							setProdutos={setProdutosData}
							setCategorias={setCategorias}
						/>
					)}
				</main>
			</Drawer>
		</div>
	);
}
