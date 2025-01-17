import Link from 'next/link';

const companies = [
	{ name: 'Empresa A', description: 'Descrição da Empresa A' },
	{ name: 'Empresa B', description: 'Descrição da Empresa B' },
	{ name: 'Empresa C', description: 'Descrição da Empresa C' },
	{ name: 'Empresa D', description: 'Descrição da Empresa D' },
];

export default function CompaniesPage() {
	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<h1 className="text-3xl font-bold text-center mb-8">Lista de Empresas</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{companies.map((company, index) => (
					<div
						key={index}
						className="card w-full bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all">
						<div className="card-body">
							<h2 className="card-title text-xl font-semibold">{company.name}</h2>
							<p className="text-gray-600">{company.description}</p>
							<div className="card-actions justify-end">
								<Link
									className="btn btn-primary"
									href={`/empresas/${company.name}`}>
									Visitar
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
