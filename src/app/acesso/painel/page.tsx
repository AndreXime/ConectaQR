'use client';
import { Drawer, Resumo, Produtos } from '@/components/Painel';
import { useEffect, useState } from 'react';
export default function App() {
	const [Tab, setTab] = useState('Resumo');
	const [InfoData, setInfoData] = useState({ nome: '', desc: '', tema: '', qtdProdutos: '', categorias: [''] });
	const [ProdutosData, setProdutosData] = useState([{ nome: '', preco: '', categorias: '' }]);

	useEffect(() => {
		setInfoData({
			nome: 'GraceElegance',
			desc: 'A GraceElegance é uma loja especializada em acessórios sofisticados e artesanais, unindo estilo e autenticidade em cada peça. Com um toque de criatividade e elegância, oferecemos uma ampla variedade de colares, pulseiras, brincos e outros adornos feitos à mão, garantindo exclusividade e alta qualidade. Nossos produtos são cuidadosamente confeccionados com materiais selecionados, proporcionando charme e personalidade para quem busca acessórios únicos. Seja para o dia a dia ou ocasiões especiais, a GraceElegance transforma cada detalhe em uma expressão de beleza e sofisticação.',
			tema: 'valentine',
			qtdProdutos: '25',
			categorias: ['Cosmeticos', 'Terços', 'Laços', 'Velas'],
		});
		setProdutosData([
			{ nome: 'Laço gorgurão', preco: '15', categorias: 'Laços' },
			{ nome: 'Vela decoradas', preco: '25', categorias: 'Velas' },
		]);
	}, []);

	return (
		<div className="min-h-screen">
			<Drawer setTab={setTab}>
				<main className="p-5">
					{Tab === 'Resumo' && (
						<Resumo
							Data={InfoData}
							setData={setInfoData}
						/>
					)}
					{Tab === 'Produtos' && (
						<Produtos
							Data={ProdutosData}
							setData={setProdutosData}
						/>
					)}
				</main>
			</Drawer>
		</div>
	);
}
