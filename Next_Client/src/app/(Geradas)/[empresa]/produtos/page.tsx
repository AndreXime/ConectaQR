import Link from 'next/link';
import { SearchProduto, ProductCard, Carrosel } from '@/components/Produtos';
import { montarQueryURL, OrganizarProdutos } from '@/lib';
import type { NextQueryType } from '@/lib/types';
import getProdutosPaginated from '@/lib/data/getProductsPaginated';

/*
	Se não ouver nenhum produto responde com uma mensagem
	Se houver tem 2 opções
	- Quando a nenhuma query que vai ser a tela inicial com sliders de alguns produtos de todas as categorias
	- Se ouver query vai mostrar em forma de Grid e com paginação
**/
export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ empresa: string }>;
    searchParams?: Promise<NextQueryType>;
}) {
    const nomeEmpresa = (await params).empresa;
    const query = await searchParams;

    const { data, pagination, tema } = await getProdutosPaginated(nomeEmpresa, query);

    const hasNoData = !data || !pagination || data.produtos.length === 0;
    const hasQueryFilter = !!query?.categoria || !!query?.search;

    const renderContent = async () => {
        if (hasNoData) {
            return (
                <div className="text-center py-16">
                    <h3 className="text-2xl font-semibold text-gray-700">Nenhum produto encontrado</h3>
                    <p className="text-gray-500 mt-2">Tente ajustar sua busca ou filtro.</p>
                </div>
            );
        }
        if (hasQueryFilter && !hasNoData) {
            return (
                <>
                    <div className="block mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Resultados para:{' '}
                            <span className="text-indigo-600 font-bold">
                                &quot;{query?.categoria || query?.search}&quot;
                            </span>
                        </h2>
                    </div>
                    {pagination.PaginasTotais > 1 && (
                        <div className="bg-white rounded-lg shadow-md p-4 flex justify-center mb-5 w-full col-span-full">
                            <div className="flex justify-center items-center gap-2 w-full">
                                <Link
                                    href={`/${nomeEmpresa}/produtos${await montarQueryURL({
                                        ...query,
                                        page: String(Number(query?.page || 1) - 1),
                                    })}`}
                                    passHref
                                >
                                    <button
                                        className="pagination-btn px-4"
                                        disabled={Number(query?.page) <= 1 || !query?.page}
                                    >
                                        « Anterior
                                    </button>
                                </Link>
                                {Array.from({ length: pagination.PaginasTotais }, async (_, index) => {
                                    const pageNumber = index + 1;
                                    const isCurrentPage = (Number(query?.page) || 1) === pageNumber;

                                    return (
                                        <Link
                                            key={pageNumber}
                                            className={`pagination-btn ${isCurrentPage ? 'active' : ''}`}
                                            href={`/${nomeEmpresa}/produtos${await montarQueryURL({
                                                ...query,
                                                page: String(pageNumber),
                                            })}`}
                                        >
                                            {pageNumber}
                                        </Link>
                                    );
                                })}
                                <Link
                                    href={`/${nomeEmpresa}/produtos${await montarQueryURL({
                                        ...query,
                                        page: String(Number(query?.page || 1) + 1),
                                    })}`}
                                    passHref
                                >
                                    <button
                                        className="pagination-btn px-4"
                                        disabled={Number(query?.page) >= pagination.PaginasTotais}
                                    >
                                        Próximo »
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.produtos.map((product, index) => (
                            <ProductCard
                                key={index}
                                name={product.nome}
                                image={product.imagemUrl}
                                price={Number(product.preco).toFixed(2)}
                            />
                        ))}
                    </div>
                </>
            );
        }
        return (
            <div id="product-sections">
                {Object.entries(await OrganizarProdutos(data)).map(([categoria, produtos]) => (
                    <Carrosel
                        key={categoria}
                        title={categoria}
                        categoryHref={`/${nomeEmpresa}/produtos?categoria=${categoria}`}
                    >
                        {produtos.map((produto) => (
                            <ProductCard
                                key={produto.nome}
                                name={produto.nome}
                                image={produto.imagemUrl}
                                price={Number(produto.preco).toFixed(2)}
                            />
                        ))}
                    </Carrosel>
                ))}
            </div>
        );
    };

    return (
        <div data-theme={tema} className="min-h-screen">
            <header className="bg-white shadow-md py-5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <Link href={`/${nomeEmpresa}`}>
                            <h1 className="text-3xl font-bold text-indigo-600 capitalize">
                                {nomeEmpresa.split('-').join(' ')}
                            </h1>
                        </Link>

                        <div className="w-full md:w-1/4">
                            <SearchProduto
                                className="input input-bordered gap-2 w-full my-2 text-base-content border-2"
                                empresa={nomeEmpresa}
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        <Link
                            href={`/${nomeEmpresa}/produtos`}
                            className={`px-4 py-2 text-sm rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 transition ${
                                !!query?.categoria ? '' : 'tag-active'
                            }`}
                        >
                            Todos
                        </Link>
                        {data.categorias.map((value) => (
                            <Link
                                key={value.nome}
                                href={`/${nomeEmpresa}/produtos?categoria=${value.nome}`}
                                className={`px-4 py-2 text-sm rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 transition ${
                                    query?.categoria == value.nome ? 'tag-active' : ''
                                }`}
                            >
                                {value.nome}
                            </Link>
                        ))}
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">{await renderContent()}</main>
            <footer className="bg-white border-t border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
                    <p className="capitalize mb-2">{nomeEmpresa.split('-').join(' ')}</p>
                    <p className="text-gray-500">&copy; 2025 ConectaQR. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
