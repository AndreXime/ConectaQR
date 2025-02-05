import Painel from './Painel';
type DataInitial = {
	Info: { nome: string; desc: string; tema: string; qtdProdutos: string };
	Produtos: { nome: string; imagem: string; preco: string; categorias: string }[];
	Categorias: string[];
};

export type PropsPage = {
	initialData: DataInitial;
};

export default async function PageServer() {
	const Data = {
		Info: {
			nome: 'TechHub',
			desc: 'Uma loja online especializada em gadgets e acessórios tecnológicos.',
			tema: 'lofi',
			qtdProdutos: '3',
		},
		Produtos: [
			{
				nome: 'Smartwatch VibeX',
				imagem: '/produtos/produto1.jpeg',
				preco: '899,00',
				categorias: 'Relógios, Tecnologia, Acessórios',
			},
		],
		Categorias: ['Relógios', 'Tecnologia', 'Acessórios', 'Fones de Ouvido', 'Áudio', 'Carregadores', 'Energia'],
	};
	return <Painel initialData={Data} />;
}
