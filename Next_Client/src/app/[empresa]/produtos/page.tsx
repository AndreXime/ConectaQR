import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header, ProductCard } from '@/components/Produtos';
import Carrosel from '@/components/Produtos/Carrosel';
import { montarQueryURL, OrganizarProdutos } from '@/lib/index';
import type { Produto, ProdutoPageProps } from '@/lib/types';

async function getProps(nome: string, query: string): Promise<ProdutoPageProps> {
	const URL = `${process.env.NEXT_PUBLIC_API_URL}/produto/${nome}${query}`;

	try {
		const response = await fetch(URL, { method: 'get', cache: 'no-store' });
		const status = response.status;
		if (status >= 400) {
			notFound();
		} else {
			const { data, pagination, tema } = await response.json();
			return { data, pagination, tema };
		}
	} catch {
		notFound();
	}
}
/*
	Se não ouver nenhum produto responde com uma mensagem
	Se houver tem 2 opções
	- Quando a nenhuma query que vai ser a tela inicial vai mostrar 
	sliders de alguns produtos de todas as categorias
	- Se ouver query vai mostrar em forma de Grid e com paginação
**/
export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{ empresa: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const nomeEmpresa = (await params).empresa;
	const query = await searchParams;

	const queryUrl = await montarQueryURL(
		(query?.page as string) || undefined,
		(query?.categoria as string) || undefined,
		(query?.search as string) || undefined
	);

	const { data, pagination, tema } = await getProps(nomeEmpresa, queryUrl);

	const hasNoData = !data || !pagination || data.produtos.length === 0;
	const hasQueryFilter = !!query?.categoria || !!query?.search;

	let ProdutoPorCategoria: Record<string, Produto[]> = {};
	if (!query?.categoria && !hasNoData) {
		ProdutoPorCategoria = await OrganizarProdutos(data);
	}

	return (
		<div
			data-theme={tema}
			className="flex flex-col min-h-screen">
			<Header
				Categorias={data?.categorias}
				EmpresaName={nomeEmpresa}>
				<main className="flex-grow container min-h-screen pb-4 px-4 mx-auto">
					{hasNoData && (
						<h1 className="text-2xl font-bold text-center my-7">Não temos nenhum produto castrado no momento</h1>
					)}
					{hasQueryFilter && !hasNoData && (
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-7">
							{pagination.PaginasTotais > 1 && (
								<div className="flex justify-center gap-4 mb-5 col-span-full">
									{Array.from({ length: pagination.PaginasTotais }, async (_, index) => (
										<Link
											key={`${index + 1}`}
											className="btn btn-outline"
											href={`/${nomeEmpresa}/produtos${await montarQueryURL(
												String(index + 1),
												(query?.categoria as string) || undefined,
												(query?.search as string) || undefined
											)}`}>
											{`${index + 1}`}
										</Link>
									))}
								</div>
							)}
							{data.produtos.map((product, index) => (
								<ProductCard
									key={index}
									name={product.nome}
									image={product.imagemUrl}
									price={Number(product.preco).toFixed(2)}
									className="col-span-1 border-1"
								/>
							))}
						</div>
					)}
					{!hasNoData && !hasQueryFilter && (
						<>
							<div className="text-center py-10">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Descubra nossos preço</h1>
							</div>
							{Object.entries(ProdutoPorCategoria).map(([categoria, produtos], index) => (
								<div key={categoria}>
									<div className="flex justify-between items-center px-2 pt-3">
										<h2 className="text-xl py-4 font-bold">{categoria}</h2>
										<Link
											href={`/${nomeEmpresa}/produtos?categoria=${categoria}`}
											className="text-xl py-4 font-bold underline">
											Ver mais
										</Link>
									</div>

									<Carrosel
										key={categoria + index}
										data={produtos}
									/>
								</div>
							))}
						</>
					)}
				</main>

				<footer className="bg-primary text-primary-content p-4">
					<div className="container mx-auto text-center">
						<p className="capitalize">{nomeEmpresa.split('-').join(' ')}</p>
						<p>ConectaQR - Todos os direitos reservados. &copy; {new Date().getFullYear()} </p>
					</div>
				</footer>
			</Header>
		</div>
	);
}
