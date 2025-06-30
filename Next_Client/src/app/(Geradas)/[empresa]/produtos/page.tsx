import Link from 'next/link';
import { SearchProduto, Header, ProductCard, Carrosel } from '@/components/Produtos';
import { montarQueryURL, OrganizarProdutos } from '@/lib';
import type { NextQueryType } from '@/lib/types';
import { FiChevronRight } from 'react-icons/fi';
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
                <h1 className="text-2xl font-bold text-center my-7">Não temos nenhum produto castrado no momento</h1>
            );
        }
        if (hasQueryFilter && !hasNoData) {
            return (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-7">
                    {pagination.PaginasTotais > 1 && (
                        <div className="flex justify-center gap-4 mb-5 col-span-full">
                            {Array.from({ length: pagination.PaginasTotais }, async (_, index) => (
                                <Link
                                    key={`${index + 1}`}
                                    className="btn btn-outline"
                                    href={`/${nomeEmpresa}/produtos${await montarQueryURL({
                                        page: String(index + 1),
                                        categoria: query.categoria,
                                        search: query.search,
                                    })}`}
                                >
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
            );
        }
        return (
            <>
                {Object.entries(await OrganizarProdutos(data)).map(([categoria, produtos], index) => (
                    <div key={categoria}>
                        <div className="flex justify-between items-center pb-3 pt-10">
                            <h2 className="text-xl md:text-2xl font-bold">{categoria}</h2>
                            <Link
                                href={`/${nomeEmpresa}/produtos?categoria=${categoria}`}
                                className="text-lg md:text-xl text-primary font-bold flex flex-row items-center"
                            >
                                Ver mais
                                <FiChevronRight className="ml-1" size={22} />
                            </Link>
                        </div>

                        <Carrosel key={categoria + index} data={produtos} />
                    </div>
                ))}
            </>
        );
    };

    return (
        <div data-theme={tema} className="flex flex-col min-h-screen">
            <Header Categorias={data?.categorias} EmpresaName={nomeEmpresa}>
                <main className="flex-grow container min-h-screen pb-4 px-2 mx-auto">
                    <div className="space-y-4 py-10">
                        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Nossos Produtos</h1>
                        <p className="max-w-xl text-base md:text-lg">
                            Confira nossa variedade de produtos selecionados com qualidade.
                        </p>
                        <SearchProduto
                            className="input input-bordered gap-2 w-full my-2 text-base-content"
                            empresa={nomeEmpresa}
                        />
                    </div>
                    {await renderContent()}
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
