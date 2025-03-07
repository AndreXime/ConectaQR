import { Footer, Header, ProductCard } from '@/components/Produtos';
import { notFound } from 'next/navigation';
import type { Produto, ProdutoPageProps } from '@/lib/types';
import Carrosel from '@/components/Produtos/Carrosel';
import { montarQueryURL, OrganizarProdutos } from '@/lib/index';
import Link from 'next/link';

async function getProps(nome: string, query: string): Promise<ProdutoPageProps> {
	const URL = `${process.env.NEXT_PUBLIC_API_URL}/produto/${nome}${query}`;

	try {
		const response = await fetch(URL, { method: 'get', cache: 'no-store' });
		const status = response.status;
		if (status >= 400) {
			return { error: true };
		} else {
			const { data, pagination, tema } = await response.json();
			return { data, pagination, tema };
		}
	} catch {
		return { error: true };
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

	const { error, data, pagination, tema } = await getProps(nomeEmpresa, queryUrl);

	if (error) {
		notFound();
	}

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
							{Object.entries(ProdutoPorCategoria).map(([categoria, produtos], index) => (
								<div key={categoria}>
									<h2 className="text-2xl py-10 font-bold text-center">{categoria}</h2>
									<Carrosel
										key={categoria + index}
										categoria={categoria}
										urlCategoria={`/${nomeEmpresa}/produtos?categoria=${categoria}`}
										data={produtos}
									/>
								</div>
							))}
						</>
					)}
				</main>
				<Footer EmpresaName={nomeEmpresa.split('-').join(' ')} />
			</Header>
		</div>
	);
}
