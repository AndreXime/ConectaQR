import { Footer, Header, ProductCard } from '@/components/Produtos';
import { notFound } from 'next/navigation';

type ProdutoType = {
	name: string;
	image: string;
	price: string;
	categorias: string[];
};

type PropsType = {
	produtos: ProdutoType[];
	categorias: string[];
};

async function getProps(): Promise<PropsType> {
	const categorias = ['Saudavel', 'Limpeza', 'Alimentação', 'Higiene', 'Comestico', 'Construção'];

	const produtos = [
		{ name: 'Sopa Detox', image: '/produto1.jpeg', price: 'R$ 40,00', categorias: ['Saudavel', 'Alimentação'] },
		{ name: 'Desinfetante Floral', image: '/produto2.jpeg', price: 'R$ 15,00', categorias: ['Limpeza'] },
		{
			name: 'Creme Facial Anti-Idade',
			image: '/produto3.jpeg',
			price: 'R$ 120,00',
			categorias: ['Higiene', 'Comestico'],
		},
		{ name: 'Lixa de Unha Profissional', image: '/produto4.jpeg', price: 'R$ 25,00', categorias: ['Comestico'] },
		{ name: 'Martelo de Carpinteiro', image: '/produto1.jpeg', price: 'R$ 30,00', categorias: ['Construção'] },
		{
			name: 'Creme para Hidratação Profunda',
			image: '/produto4.jpeg',
			price: 'R$ 45,00',
			categorias: ['Higiene', 'Comestico'],
		},
		{ name: 'Café Orgânico', image: '/produto2.jpeg', price: 'R$ 18,00', categorias: ['Saudavel', 'Alimentação'] },
		{ name: 'Kit de Vassoura e Rodo', image: '/produto3.jpeg', price: 'R$ 80,00', categorias: ['Limpeza'] },
	];

	return { produtos, categorias };
}

export default async function Page({ params }: { params: Promise<{ empresa: string }> }) {
	const nomeEmpresa = (await params).empresa;

	const { produtos, categorias } = await getProps();

	// Retorna um erro 404 caso o produto não seja encontrado
	if (!nomeEmpresa) {
		return notFound();
	}

	return (
		<div
			data-theme={'retro'}
			className="flex flex-col min-h-screen">
			<Header
				Categorias={categorias}
				EmpresaName={nomeEmpresa}>
				<main className="flex-grow container mx-auto p-4">
					<h1 className="text-3xl font-bold text-center my-8">Produtos Disponíveis</h1>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
						{produtos.map((product, index) => (
							<ProductCard
								key={index}
								name={product.name}
								image={product.image}
								price={product.price}
								categorias={product.categorias}
							/>
						))}
					</div>
				</main>
				<Footer
					EmpresaName={nomeEmpresa}
					Telefone={'40028922'}
				/>
			</Header>
		</div>
	);
}
