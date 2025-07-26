import { Footer } from '@/module/Home/components';
import Link from 'next/link';
import Image from 'next/image';
import type { EmpresaPublica } from '@/types/global';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ConnectQR - Empresas',
    description: 'Todas as empresas parceiras que estão presentes na nossa plataforma',
    keywords: ['Conectar', 'Produtos', 'Vitrine', 'Lojas', 'Vendas', 'Empresas'],
};

async function getCompanies(): Promise<EmpresaPublica[] | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            return null;
        } else {
            const data = await response.json();
            return data.data;
        }
    } catch {
        return null;
    }
}

export default async function CompaniesPage() {
    const Empresas = await getCompanies();

    return (
        <>
            <div className="min-h-dvh bg-base-100">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 ">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500">
                                Empresas Cadastradas
                            </h1>
                            <p className="max-w-xl text-gray-600">Descubra lojas e serviços disponíveis na ConectaQR</p>
                            {/*<div className="flex w-full max-w-md space-x-2">
								<input
									type="text"
									placeholder="Buscar por nome"
									className="input input-bordered flex-1"
								/>
								<button
									type="submit"
									className="btn btn-primary">
									Buscar
								</button>
							</div>*/}
                        </div>
                    </div>
                </section>

                {Empresas?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10	 mb-15">
                        {Empresas.map((company, index) => (
                            <div key={index} className="card shadow-lg rounded-lg overflow-hidden flex flex-col">
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={company.foto || '/assets/blankphoto.png'}
                                        alt={company.nome}
                                        fill
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                                <div className="card-body flex flex-col flex-grow">
                                    <h2 className="card-title capitalize">{company.nome.split('-').join(' ')}</h2>
                                    <p className="text-sm text-gray-500">{company.cidade}</p>
                                    <p className="text-gray-700 flex-grow">{company.descricao}</p>
                                    <div className="card-actions justify-end mt-2">
                                        <Link href={`/${company.nome}`} className="btn btn-primary w-full">
                                            Visitar
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-grow p-10">
                        <h2 className="text-2xl text-center font-bold">Não foi possivel encontrar nenhuma empresa</h2>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
