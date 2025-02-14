import { Drawer, Footer } from '@/components/Home';
import Link from 'next/link';
import type { Empresa } from '@/types/types';

async function getCompanies(): Promise<Empresa[] | null> {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresas`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw Error;
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
		<Drawer>
			<div className="min-h-screen bg-base-200">
				{Empresas?.length ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-3">
						<h1 className="text-2xl font-bold text-center col-span-full pt-5">Empresas na ConectaQR</h1>
						{Empresas.map((company, index) => (
							<div
								key={index}
								className="card w-full bg-base-100 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all">
								<div className="card-body">
									<h3 className="card-title text-xl font-semibold justify-center capitalize">
										{company.nome.split('-').join(' ')}
									</h3>
									<p className="text-base-content my-2 text-center">{company.descricao}</p>
									<div className="card-actions justify-center">
										<Link
											className="btn btn-primary btn-wide"
											href={`/${company.nome.replace(/ /g, '-')}`}>
											Visitar
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="flex-grow m-10">
						<h2 className="text-2xl text-center font-bold">Não foi possivel encontrar nenhuma empresa</h2>
					</div>
				)}
			</div>
			<Footer />
		</Drawer>
	);
}
