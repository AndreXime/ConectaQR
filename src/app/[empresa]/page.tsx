import { Header, Footer } from '@/components/Empresa';
import { FaMapMarkerAlt, FaPhoneAlt, FaShoppingCart, FaQrcode } from 'react-icons/fa';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Componente da página, usando parâmetros
export default async function Page({ params }: { params: Promise<{ empresa: string }> }) {
	const nomeEmpresa = (await params).empresa;

	if (!nomeEmpresa) {
		return notFound();
	}

	const Informações = {
		GoogleMaps: false,
		Contato: false,
		QRcode: false,
	};

	return (
		<div className="flex flex-col min-h-screen">
			<Header EmpresaName={nomeEmpresa} />
			<main className="flex-grow grid grid-cols-3 mt-8 mx-2 lg:mx-52 ">
				<div className="flex flex-col col-span-3">
					<h2 className="text-center text-lg">
						A TechNova é uma empresa inovadora que se especializa em fornecer soluções tecnológicas de ponta para
						empresas de diversos setores. Com uma equipe altamente qualificada e uma abordagem voltada para o futuro, a
						TechNova desenvolve softwares personalizados, plataformas de automação e sistemas de inteligência
						artificial, sempre com o objetivo de otimizar processos, melhorar a eficiência operacional e proporcionar
						vantagens competitivas para seus clientes.
					</h2>
				</div>
				<div className="flex flex-col lg:flex-row justify-evenly col-span-3">
					<Link
						className="btn btn-soft btn-primary font-bold text-lg"
						href={`/${nomeEmpresa}/produtos`}>
						<FaShoppingCart />
						Visitar produtos
					</Link>
					<button
						className={`btn btn-soft btn-primary font-bold text-lg mb-2 ${Informações.Contato ? ' ' : 'btn-disabled'}`}>
						<FaPhoneAlt /> Informações de contato
					</button>
					<button
						className={`btn btn-soft btn-primary font-bold text-lg mb-2 ${Informações.QRcode ? ' ' : 'btn-disabled'}`}>
						<FaQrcode /> QR Code
					</button>
					<button
						className={`btn btn-soft btn-primary font-bold text-lg mb-2 ${
							Informações.GoogleMaps ? ' ' : 'btn-disabled'
						}`}>
						<FaMapMarkerAlt />
						Google Maps
					</button>
				</div>
			</main>
			<Footer />
		</div>
	);
}
