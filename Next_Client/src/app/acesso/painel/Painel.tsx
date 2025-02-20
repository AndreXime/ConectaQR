'use client';
import { Drawer, Resumo, Produtos, Editar, QRCode } from '@/components/Painel';
import { useEffect, useState } from 'react';
import type { PropsPage } from './page';

export default function App({ initialData }: PropsPage) {
	const [Tab, setTab] = useState('Inicio');
	const [Empresa, setEmpresa] = useState(initialData);
	const [ProdutosData, setProdutosData] = useState(initialData.produtos);
	const [Categorias, setCategorias] = useState(initialData.categorias);

	useEffect(() => {
		document.getElementById('root')?.setAttribute('data-theme', Empresa.tema);
	}, [Tab, Empresa.tema]);

	return (
		<div
			id="root"
			data-theme={Empresa.tema}
			className="min-h-screen bg-base-100">
			<Drawer
				setTab={setTab}
				nomeEmpresa={Empresa.nome}>
				<main className="p-3">
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
							setEmpresa={setEmpresa}
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
					{Tab === 'QRCode' && (
						<QRCode
							categorias={Categorias || []}
							nomeEmpresa={Empresa.nome}
						/>
					)}
				</main>
			</Drawer>
		</div>
	);
}
