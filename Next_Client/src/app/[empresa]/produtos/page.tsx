import { Footer, Header, ProductCard } from '@/components/Produtos';
import { notFound } from 'next/navigation';

type PropsType = {
	naoExiste?: boolean;
	data?: {
		produtos: {
			nome: string;
			imagemUrl: string;
			preco: string;
		}[];
		categorias: {
			nome: string;
		}[];
	};
	pagination?: { PaginaAtual: number; limitePorPagina: number; ProdutosTotal: number; PaginasTotais: number };
	tema?: string;
};
type getProps = {
	nomeEmpresa: string;
	page: string | null;
	categorias: string | null;
	search: string | null;
};

async function getProps({ nomeEmpresa, page, categorias, search }: getProps): Promise<PropsType> {
	const queryCategoria = `${categorias ? `?categoria=${categorias}` : ''}`;
	const querySearch = `${search ? `?search=${search}` : ''}`;
	const queryPage = `${page ? `?page=${page}` : ''}`;

	const URL = `${process.env.NEXT_PUBLIC_API_URL}/produto/${nomeEmpresa}${queryPage}${queryCategoria}${querySearch}`;

	try {
		const response = await fetch(URL, { method: 'get' });
		const status = response.status;
		if (status >= 400) {
			return { naoExiste: true };
		} else {
			const { data, pagination, tema } = await response.json();
			return { data, pagination, tema };
		}
	} catch {
		return { naoExiste: true };
	}
}

export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{ empresa: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const nomeEmpresa = (await params).empresa;

	const querys = await searchParams;
	const page = (querys?.page as string) || null;
	const categorias = (querys?.categoria as string) || null;
	const search = (querys?.s as string) || null;

	const { naoExiste, data, pagination, tema } = await getProps({ nomeEmpresa, page, categorias, search });

	if (naoExiste) {
		notFound();
	}

	return (
		<div
			data-theme={tema}
			className="flex flex-col min-h-screen">
			{!data || !pagination || data.produtos.length == 0 ? (
				<Header
					Categorias={data?.categorias}
					EmpresaName={nomeEmpresa.split('-').join(' ')}>
					<main className="flex-grow container mx-auto p-4">
						<h1 className="text-2xl font-bold text-center my-5">
							Essa empresa não tem nenhum produto castrado no momento
						</h1>
					</main>
				</Header>
			) : (
				<Header
					Categorias={data.categorias}
					EmpresaName={nomeEmpresa}>
					<main className="flex-grow container p-4 mx-auto">
						<div className="flex justify-center gap-4 mb-5">
							{pagination.PaginasTotais > 1 && (
								<>
									{Array.from({ length: pagination.PaginasTotais }, (_, index) => (
										<button
											key={index + 1}
											className="btn btn-outline">
											{index + 1}
										</button>
									))}
								</>
							)}
						</div>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
							{data.produtos.map((product, index) => (
								<ProductCard
									key={index}
									name={product.nome}
									image={product.imagemUrl}
									price={Number(product.preco).toFixed(2)}
								/>
							))}
						</div>
					</main>
					<Footer EmpresaName={nomeEmpresa.split('-').join(' ')} />
				</Header>
			)}
		</div>
	);
}
