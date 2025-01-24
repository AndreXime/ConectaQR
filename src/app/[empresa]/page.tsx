'use client';
import { Header, Footer, ContatoButton } from '@/components/Empresa';
import { FaMapMarkerAlt, FaShoppingCart, FaQrcode } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loader from '@/components/common/loader';

type InfoType = {
	desc: string;
	maps: string;
	contato: string[];
	tema: string;
	nomeEmpresa: string;
};

export default function Page() {
	const [info, setInfo] = useState<InfoType>({ desc: '', maps: '', contato: [''], tema: 'light', nomeEmpresa: '' });
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
		const nomeEmpresa = pathname.split('/')[1] || '';

		setInfo({
			nomeEmpresa: nomeEmpresa,
			desc: `A TechNova é uma empresa inovadora que se especializa em fornecer soluções tecnológicas de ponta para
			empresas de diversos setores. Com uma equipe altamente qualificada e uma abordagem voltada para o futuro, a
			TechNova desenvolve softwares personalizados, plataformas de automação e sistemas de inteligência
			artificial, sempre com o objetivo de otimizar processos, melhorar a eficiência operacional e proporcionar
			vantagens competitivas para seus clientes.`,
			maps: 'https://maps.app.goo.gl/hyTt2t8uPFMkcQ3B7',
			contato: ['Nossa loja está na endereço tal', 'Telefone tal'],
			tema: 'retro',
		});

		setLoading(false);
	}, []);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div
					id="root"
					data-theme={info.tema}
					className="flex flex-col min-h-screen bg-base-100">
					<Header
						Icon={false}
						EmpresaName={info.nomeEmpresa}
					/>
					<main className="flex-grow grid grid-cols-3 mt-8 mx-2 lg:mx-52">
						<div className="flex flex-col col-span-3">
							<h2 className="text-center text-lg">{info.desc}</h2>
						</div>
						<div className="flex flex-col items-center gap-4 col-span-3">
							<Link
								className="btn btn-primary font-bold text-lg  w-1/2"
								href={`/${info.nomeEmpresa}/produtos`}>
								<FaShoppingCart />
								Visitar produtos
							</Link>

							<ContatoButton Message={info.contato} />

							<Link
								href={`/${info.nomeEmpresa}/QRCode`}
								className="btn btn-primary font-bold text-lg w-1/2">
								<FaQrcode /> QR Code
							</Link>
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href={info.maps}
								className={`btn btn-primary font-bold text-lg ${info.maps ? ' ' : 'btn-disabled'} w-1/2`}>
								<FaMapMarkerAlt />
								Google Maps
							</Link>
						</div>
					</main>
					<Footer />
				</div>
			)}
		</>
	);
}
