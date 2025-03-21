import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaBagShopping, FaInstagram, FaMapPin, FaPhone } from 'react-icons/fa6';
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
			className="flex flex-col min-h-dvh bg-base-100">
			<header className="bg-gradient-to-r from-primary to-secondary ">
				<div className="container mx-auto px-4 py-8 md:py-16">
					<div className="flex flex-col md:flex-row items-center justify-between gap-8">
						<div className="space-y-4 md:w-1/2 text-center md:text-left">
							<h1 className="text-4xl md:text-5xl font-bold tracking-tight capitalize">{nomeEmpresa}</h1>
							<p className="text-lg md:text-xl opacity-90 max-w-xl">
								{info.descricao || 'Não foi informado nenhuma descrição'}
							</p>
							<div className="flex flex-wrap gap-5 pt-4 justify-center md:justify-start">
								<Link
									href={`/${nomeEmpresa}/produtos`}
									className="btn btn-accent btn-lg">
									<FaBagShopping className="mr-2" />
									Ver produtos
								</Link>
								<div className="flex gap-3">
									{info.instagram && (
										<Link
											rel="noopener noreferrer nofollow"
											className="btn btn-ghost btn-lg"
											href={`https://www.instagram.com/${
												info.instagram.startsWith('@') ? info.instagram.slice(1) : info.instagram
											}`}>
											<FaInstagram size={35} />
											<span className="sr-only">Instagram</span>
										</Link>
									)}
									{info.telefone && (
										<Link
											rel="noopener noreferrer nofollow"
											className="btn btn-ghost btn-lg"
											href={`tel:${info.telefone}`}>
											<FaPhone size={33} />
											<span className="sr-only">Telefone</span>
										</Link>
									)}

									{info.emailContato && (
										<Link
											rel="noopener noreferrer nofollow"
											className="btn btn-ghost btn-lg"
											href={`mailto:${info.emailContato}`}>
											<MdEmail size={35} />
											<span className="sr-only">Email</span>
										</Link>
									)}
								</div>
							</div>
						</div>
						<div className="md:w-1/2 flex justify-center">
							<div className="relative w-50 h-50 md:w-80 md:h-80 bg-white/10 rounded-full p-2">
								<div className="absolute inset-0 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm">
									<Image
										src={!!info.foto ? info.foto : '/assets/blankpic.webp'}
										alt="Foto dessa empresa"
										width={500}
										height={500}
										className="object-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row items-center gap-8">
						<div className="md:w-1/2 py-9">
							<h2 className="text-3xl font-bold">Nossa Localização</h2>
							{info.cidade && (
								<div className="flex items-center gap-2 text-blue-600">
									<FaMapPin className="h-5 w-5" />
									<span>{info.cidade}</span>
								</div>
							)}
						</div>
						<div className="md:w-1/2 h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
							{!!info.maps ? (
								<iframe
									rel="noopener noreferrer nofollow"
									src={info.maps}
									width="1000"
									height="1000"
									className="border-0 object-cover w-full h-full"
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								/>
							) : (
								<Image
									src="/assets/mapsplaceholder.jpeg"
									width="1000"
									height="1000"
									className="border-0 object-cover w-full h-full"
									alt="Maps placeholder"
									loading="lazy"
								/>
							)}
						</div>
					</div>
				</div>
			</section>

			<footer className="bg-primary text-primary-content p-4">
				<div className="container mx-auto text-center">
					<p className="capitalize">{nomeEmpresa.split('-').join(' ')}</p>
					<p>ConectaQR - Todos os direitos reservados. &copy; {new Date().getFullYear()} </p>
				</div>
			</footer>
		</div>
	);
}
