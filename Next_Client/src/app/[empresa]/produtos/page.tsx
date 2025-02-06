import { Footer, Header, ProductCard } from '@/components/Produtos';

type PropsType = {
	message?: string;
	data?: {
		produtos: {
			name: string;
			image: string;
			price: string;
		}[];
		categorias: string[];
	};
	pagination?: { limitePorPagina: number; ProdutosTotal: number; PaginasTotais: number };
};

async function getProps(nomeEmpresa: string, page: string, categoria: string | null): Promise<PropsType> {
	const URL = `${process.env.API_SERVER_URL}/produto/${nomeEmpresa}?page=${page}${
		categoria ? `&categoria=${categoria}` : ''
	}`;

	try {
		const response = await fetch(URL, { method: 'get' });
		if (!response.ok) {
			const { message } = await response.json();
			return message;
		} else {
			const { data, pagination } = await response.json();
			return { data, pagination };
		}
	} catch {
		return { message: 'Erro ao buscar os dados' };
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
	const page = (querys?.page as string) || '1';
	const categorias = (querys?.categoria as string) || null;

	const { message, data, pagination } = await getProps(nomeEmpresa, page, categorias);

	return (
		<div
			data-theme={'retro'}
			className="flex flex-col min-h-screen">
			{!data || !pagination ? (
				<Header
					Categorias={['']}
					EmpresaName={nomeEmpresa}>
					<main className="flex-grow container mx-auto p-4">
						<h1 className="text-3xl font-bold text-center my-5">Não foi possivel encontrar nenhum produto</h1>
						<h2 className="text-2xl font-bold text-center my-5">{message}</h2>
					</main>
				</Header>
			) : (
				<Header
					Categorias={data.categorias}
					EmpresaName={nomeEmpresa}>
					<main className="flex-grow container mx-auto p-4">
						<h1 className="text-3xl font-bold text-center my-5">Principais produtos</h1>
						<div className="join flex justify-center mb-5">
							<button className="join-item btn">«</button>
							<button className="join-item btn">Pagina 1</button>
							<button className="join-item btn">»</button>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
							{data.produtos.map((product, index) => (
								<ProductCard
									key={index}
									name={product.name}
									image={product.image}
									price={product.price}
								/>
							))}
						</div>
					</main>
					<Footer EmpresaName={nomeEmpresa} />
				</Header>
			)}
		</div>
	);
}
