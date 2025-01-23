import { Header, Footer, ContatoButton } from '@/components/Empresa';
import { FaMapMarkerAlt, FaShoppingCart, FaQrcode } from 'react-icons/fa';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ empresa: string }> }) {
	const { empresa } = await params;

	if (!empresa) {
		return notFound();
	}

	const EmpresaInfo = {
		descrição: `A TechNova é uma empresa inovadora que se especializa em fornecer soluções tecnológicas de ponta para
						empresas de diversos setores. Com uma equipe altamente qualificada e uma abordagem voltada para o futuro, a
						TechNova desenvolve softwares personalizados, plataformas de automação e sistemas de inteligência
						artificial, sempre com o objetivo de otimizar processos, melhorar a eficiência operacional e proporcionar
						vantagens competitivas para seus clientes.`,
		GoogleMaps: 'https://maps.app.goo.gl/hyTt2t8uPFMkcQ3B7',
		Contato: ['Nossa loja está na endereço tal', 'Telefone tal'],
		QRcode: true,
		Tema: 'retro',
	};

	return (
		<div
			id="root"
			data-theme={EmpresaInfo.Tema}
			className="flex flex-col min-h-screen bg-base-100">
			<Header
				Icon={false}
				EmpresaName={empresa}
			/>
			<main className="flex-grow grid grid-cols-3 mt-8 mx-2 lg:mx-52">
				<div className="flex flex-col col-span-3">
					<h2 className="text-center text-lg">{EmpresaInfo.descrição}</h2>
				</div>
				<div className="flex flex-col lg:flex-row justify-evenly col-span-3">
					<Link
						className="btn btn-primary font-bold text-lg"
						href={`/${empresa}/produtos`}>
						<FaShoppingCart />
						Visitar produtos
					</Link>

					<ContatoButton Message={EmpresaInfo.Contato} />

					<Link
						href={`/${empresa}/QRCode`}
						className={`btn btn-primary font-bold text-lg mb-2 ${EmpresaInfo.QRcode ? ' ' : 'btn-disabled'}`}>
						<FaQrcode /> QR Code
					</Link>
					<Link
						target="_blank"
						rel="noopener noreferrer"
						href={EmpresaInfo.GoogleMaps}
						className={`btn btn-primary font-bold text-lg mb-2 ${EmpresaInfo.GoogleMaps ? ' ' : 'btn-disabled'}`}>
						<FaMapMarkerAlt />
						Google Maps
					</Link>
				</div>
			</main>
			<Footer />
		</div>
	);
}
