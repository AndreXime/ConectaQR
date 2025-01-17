import { Footer, Header, ProductCard } from '@/components/index';
import { notFound } from 'next/navigation';

// Componente da página, usando parâmetros
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;

	const categorias = { sa: 'Saudavel', li: 'Limpeza', al: 'Alimento', hi: 'Higiene', cm: 'Comestico' };

	const products = [
		{ name: 'Almoço PF', image: '/produto1.jpeg', price: 'R$ 100,00', categorias: [categorias.al, categorias.sa] },
		{ name: 'Cesta de limpeza', image: '/produto2.jpeg', price: 'R$ 150,00', categorias: [categorias.li] },
		{ name: 'Kit skincare', image: '/produto3.jpeg', price: 'R$ 200,00', categorias: [categorias.hi] },
		{ name: 'Produto 10', image: '/produto4.jpeg', price: 'R$ 200,00', categorias: [categorias.cm] },
	];

	// Retorna um erro 404 caso o produto não seja encontrado
	if (!id) {
		return notFound();
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow container mx-auto p-4">
				<h1 className="text-3xl font-bold text-center my-8">Produtos Disponíveis</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
					{products.map((product, index) => (
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
			<Footer />
		</div>
	);
}
