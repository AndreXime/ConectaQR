import { Footer, Header, ProductCard } from '@/components/Produtos';
import { notFound } from 'next/navigation';

type ProdutoType = {
	name: string;
	image: string;
	price: string;
};

type PropsType = {
	produtos: ProdutoType[];
	categorias: string[];
};

async function getProps(): Promise<PropsType> {
	const categorias = ['Saudavel', 'Limpeza', 'Alimentação', 'Higiene', 'Comestico', 'Construção'];

	const produtos = [
		{ name: 'Sopa Detox', image: '/produtos/produto1.jpeg', price: 'R$ 40,00' },
		{ name: 'Desinfetante Floral', image: '/produtos/produto2.jpeg', price: 'R$ 15,00' },
		{ name: 'Creme Facial Anti-Idade', image: '/produtos/produto3.jpeg', price: 'R$ 120,00' },
		{ name: 'Lixa de Unha Profissional', image: '/produtos/produto4.jpeg', price: 'R$ 25,00' },
		{ name: '12345678901234567 12345678901234567', image: '/produtos/produto1.jpeg', price: '34 caracteres' },
		{ name: 'Creme para Hidratação Profunda', image: '/produtos/produto4.jpeg', price: 'R$ 45,00' },
		{ name: 'Café Orgânico', image: '/produtos/produto2.jpeg', price: 'R$ 18,00' },
		{ name: 'Kit de Vassoura e Rodo', image: '/produtos/produto3.jpeg', price: 'R$ 80,00' },
	];

	return { produtos, categorias };
}

export default async function Page({ params }: { params: Promise<{ empresa: string }> }) {
	const nomeEmpresa = (await params).empresa;

	const { produtos, categorias } = await getProps();

	if (!produtos) {
		return notFound();
	}

	return (
		<body
			data-theme={'retro'}
			className="flex flex-col min-h-screen">
			<Header
				Categorias={categorias}
				EmpresaName={nomeEmpresa}>
				<main className="flex-grow container mx-auto p-4">
					<h1 className="text-3xl font-bold text-center my-5">Principais produtos</h1>
					<div className="join flex justify-center mb-5">
						<button className="join-item btn">«</button>
						<button className="join-item btn">Pagina 1</button>
						<button className="join-item btn">»</button>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
						{produtos.map((product, index) => (
							<ProductCard
								key={index}
								name={product.name}
								image={product.image}
								price={product.price}
							/>
						))}
					</div>
				</main>
				<Footer
					EmpresaName={nomeEmpresa}
					Telefone={'40028922'}
				/>
			</Header>
		</body>
	);
}
