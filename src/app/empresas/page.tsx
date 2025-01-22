import Link from 'next/link';

const companies = [
	{ name: 'TechNova', description: 'Inovação tecnológica para soluções empresariais.' },
	{ name: 'GreenSprout', description: 'Soluções sustentáveis para um futuro mais verde.' },
	{ name: 'CaféVibe', description: 'Cafeteria especializada em grãos premium e experiências únicas.' },
	{ name: 'SkyWave', description: 'Tecnologia de ponta para serviços de telecomunicações.' },
	{ name: 'FitWell', description: 'Equipamentos de fitness modernos e eficientes para todos.' },
	{ name: 'EcoFleet', description: 'Frota elétrica e sustentável para transporte corporativo.' },
];

export default function CompaniesPage() {
	return (
		<div className="min-h-screen bg-gradient-to-r from-cyan-600 to-indigo-400 p-6">
			<h1 className="text-3xl font-bold text-center mb-8 text-white brightness-100">
				Lista de empresas presentes na ConectaQR
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
				{companies.map((company, index) => (
					<div
						key={index}
						className="card w-full bg-base-100 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all">
						<div className="card-body">
							<h2 className="card-title text-xl font-semibold">{company.name}</h2>
							<p className="text-gray-600">{company.description}</p>
							<div className="card-actions justify-end">
								<Link
									className="btn btn-primary"
									href={`/${company.name}`}>
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
