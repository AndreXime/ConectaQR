import { Header, Footer, Maps } from '@/components/Empresa';
import { FaInstagram, FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MdEmail } from 'react-icons/md';
import type { EmpresaPublica } from '@/lib/types';

async function getCompanyInfo(nomeEmpresa: string): Promise<EmpresaPublica | null> {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresas?nome=${nomeEmpresa}`, {
			method: 'get',
			cache: 'no-store',
		});
		if (!response.ok) {
			throw Error;
		} else {
			return await response.json();
		}
	} catch {
		return null;
	}
}

export default async function Page({ params }: { params: Promise<{ empresa: string }> }) {
	const nomeEmpresa = (await params).empresa;
	const info = await getCompanyInfo(nomeEmpresa);
	if (!info) {
		notFound();
	}

	return (
		<div
			data-theme={info.tema}
			className="flex flex-col min-h-screen bg-base-100">
			<Header
				Icon={false}
				EmpresaName={nomeEmpresa.split('-').join(' ')}
			/>
			<main className="flex-grow flex-col mt-8 mx-2 lg:mx-52">
				<div className="flex flex-col">
					<h2 className="text-center text-lg">{info.descricao || 'Não foi informado nenhuma descrição'}</h2>
				</div>
				<div className="flex flex-col items-center gap-10 mt-10">
					<Link
						className="btn btn-primary font-bold text-lg w-[90%] lg:w-1/2"
						href={`/${nomeEmpresa}/produtos`}>
						<FaShoppingCart />
						Ver produtos
					</Link>

					<div className="flex flex-row gap-5">
						{info.instagram && (
							<Link
								rel="noopener noreferrer nofollow"
								className="btn btn-ghost"
								href={`https://www.instagram.com/${
									info.instagram.startsWith('@') ? info.instagram.slice(1) : info.instagram
								}`}>
								<FaInstagram size={35} /> Instagram
							</Link>
						)}

						{info.telefone && (
							<Link
								rel="noopener noreferrer nofollow"
								className="btn btn-ghost"
								href={`tel:${info.telefone}`}>
								<FaWhatsapp size={35} /> WhatsApp
							</Link>
						)}

						{info.emailContato && (
							<Link
								rel="noopener noreferrer nofollow"
								className="btn btn-ghost"
								href={`mailto:${info.emailContato}`}>
								<MdEmail size={35} /> Email
							</Link>
						)}
					</div>

					{info.maps && <Maps url={info.maps} />}
				</div>
			</main>

			<Footer temaAtual={info.tema} />
		</div>
	);
}
