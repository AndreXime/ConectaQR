'use client';
import { Drawer, Resumo, Produtos, Editar } from '@/components/Painel';
import { useEffect, useState } from 'react';
import type { PropsPage } from './page';

export default function App({ initialData }: PropsPage) {
	const [Tab, setTab] = useState('Inicio');
	const [InfoData, setInfoData] = useState(initialData.Info);
	const [ProdutosData, setProdutosData] = useState(initialData.Produtos);
	const [Categorias, setCategorias] = useState(initialData.Categorias);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', InfoData.tema);
	}, [InfoData.tema]);

	return (
		<div className="min-h-screen">
			<Drawer setTab={setTab}>
				<main className="p-5">
					{Tab === 'Inicio' && (
						<Resumo
							Data={InfoData}
							qtdCategorias={Categorias.length}
						/>
					)}
					{Tab === 'Editar' && (
						<Editar
							Data={InfoData}
							setInfo={setInfoData}
						/>
					)}
					{Tab === 'Produtos' && (
						<Produtos
							Data={ProdutosData}
							Categorias={Categorias}
							setData={setProdutosData}
							setCategorias={setCategorias}
						/>
					)}
				</main>
			</Drawer>
		</div>
	);
}
