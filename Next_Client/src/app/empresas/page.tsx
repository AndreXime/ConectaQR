import { Drawer, Footer } from '@/components/Home';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
type Empresa = {
	name: string;
	description: string;
};

async function getCompanies(): Promise<Empresa[]> {
	return [
		{ name: 'TechNova', description: 'Inovação tecnológica para soluções empresariais.' },
		{ name: 'GreenSprout', description: 'Soluções sustentáveis para um futuro mais verde.' },
		{ name: 'CaféVibe', description: 'Cafeteria especializada em grãos premium e experiências únicas.' },
		{ name: 'SkyWave', description: 'Tecnologia de ponta para serviços de telecomunicações.' },
		{ name: 'FitWell', description: 'Equipamentos de fitness modernos e eficientes para todos.' },
		{ name: 'EcoFleet', description: 'Frota elétrica e sustentável para transporte corporativo.' },
	];
}

export default async function CompaniesPage() {
	const Empresas = await getCompanies();

	return (
		<Drawer>
			<div className="min-h-screen bg-base-200">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-3">
					<h1 className="text-2xl font-bold text-center col-span-full pt-5">
						Empresas na ConectaQR
						<label className="input input-bordered gap-2 w-full my-4 col-span-full">
							<input
								type="text"
								placeholder="Pesquisar empresas..."
							/>
							<FaSearch />
						</label>
					</h1>
					{Empresas.map((company, index) => (
						<div
							key={index}
							className="card w-full bg-base-100 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all">
							<div className="card-body">
								<h3 className="card-title text-xl font-semibold justify-center">{company.name}</h3>
								<p className="text-base-content my-2 text-center">{company.description}</p>
								<div className="card-actions justify-center">
									<Link
										className="btn btn-primary btn-wide"
										href={`/${company.name}`}>
										Visitar
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</Drawer>
	);
}
