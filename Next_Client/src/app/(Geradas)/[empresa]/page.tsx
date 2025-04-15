import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaInstagram, FaPhone } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import type { EmpresaPublica } from '@/lib/types';
import { FaInfoCircle, FaMapMarkerAlt, FaShoppingBag, FaShoppingCart } from 'react-icons/fa';

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
			<div className="relative h-64 md:h-96 w-full">
				<Image
					src={info.foto || '/assets/blankphoto.png'}
					alt={info.nome}
					fill
					className="object-contain w-full h-full"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
				<div className="absolute bottom-0 left-0 p-4 md:p-8 w-full">
					<div className="flex flex-col mt-2">
						{info.cidade && (
							<div className="flex items-center text-base-100 text-sm mb-3">
								{/* Ícone React Icons substituindo MapPin */}
								<FaMapMarkerAlt className="h-4 w-4 mr-1" />
								{info.cidade}
							</div>
						)}
						<h1 className="text-3xl md:text-5xl font-bold text-base-100 capitalize">
							{info.nome.split('-').join(' ')}
						</h1>
						<div className="mt-6">
							<Link
								href={`/${nomeEmpresa}/produtos`}
								className="btn border-0 w-full bg-gradient-to-r text-base-100 bg-primary hover:bg-accent h-12 flex items-center justify-center">
								<FaShoppingCart className="mr-2 h-5 w-5" />
								Ver Todos os Produtos
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Conteúdo Principal */}
			<section className="py-8 md:py-12">
				<div className=" 	 mx-auto px-4 md:px-6">
					<div className="grid gap-8 lg:grid-cols-12">
						{/* Coluna Esquerda – Sobre */}
						<div className="lg:col-span-7 space-y-6">
							<div className="card shadow">
								<div className="card-body p-6">
									<div className="flex items-center mb-4">
										<FaInfoCircle className="h-5 w-5 mr-2 text-primary" />
										<h2 className="text-2xl font-bold">Sobre</h2>
									</div>
									<p className="text-gray-700 whitespace-pre-line">{info.descricao}</p>
								</div>
							</div>

							{/* Card de Localização – Google Maps */}
							<div className="card shadow">
								<div className="card-body p-6">
									<div className="flex items-center mb-4">
										<FaMapMarkerAlt className="h-5 w-5 mr-2 text-primary" />
										<h2 className="text-2xl font-bold">Localização</h2>
									</div>
									<div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
										<div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
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
													src="/assets/mapsplaceholder.png"
													width="1000"
													height="1000"
													className="border-0 object-contain w-full h-full"
													alt="Maps placeholder"
													loading="lazy"
												/>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Coluna Direita – Informações de Contato */}
						<div className="lg:col-span-5 space-y-6">
							<div className="card bg-gradient-to-br border-0 from-purple-50 to-teal-50 ">
								<div className="card-body p-6 space-y-6">
									<div className="flex items-center">
										<h3 className="text-xl font-bold">Informações de Contato</h3>
									</div>
									<div className="space-y-4">
										{info.telefone && (
											<Link
												className="flex items-start p-3 bg-white rounded-lg shadow-sm"
												rel="noopener noreferrer nofollow"
												href={`tel:${info.telefone}`}>
												<FaPhone className="h-5 w-5 mr-3 text-primary mt-1" />
												<div>
													<p className="font-medium">Telefone</p>
													<p className="text-sm text-gray-500">{info.telefone}</p>
												</div>
											</Link>
										)}
										{info.instagram && (
											<Link
												className="flex items-start p-3 bg-white rounded-lg shadow-sm"
												rel="noopener noreferrer nofollow"
												href={`https://www.instagram.com/${
													info.instagram.startsWith('@') ? info.instagram.slice(1) : info.instagram
												}`}>
												<FaInstagram className="h-5 w-5 mr-3 text-primary mt-1" />
												<div>
													<p className="font-medium">Instagram</p>
													<p className="text-sm text-gray-500">{info.instagram}</p>
												</div>
											</Link>
										)}
										{info.emailContato && (
											<Link
												className="flex items-start p-3 bg-white rounded-lg shadow-sm"
												rel="noopener noreferrer nofollow"
												href={`mailto:${info.emailContato}`}>
												<MdEmail className="h-5 w-5 mr-3 text-primary mt-1" />
												<div>
													<p className="font-medium">Email</p>
													<p className="text-sm text-gray-500">{info.emailContato}</p>
												</div>
											</Link>
										)}
									</div>
									{info.telefone && (
										<div className="pt-4 space-y-3">
											<Link
												href={'https://wa.me/' + info.telefone}
												className="btn w-full text-white bg-green-600 hover:bg-green-700 h-12 flex items-center justify-center">
												<FaPhone className="mr-2 h-5 w-5" />
												Contato via WhatsApp
											</Link>
										</div>
									)}
								</div>
							</div>

							{/* Card adicional com informações */}
							<div className="card shadow">
								<div className="card-body p-6">
									<h3 className="text-xl font-bold mb-4 flex items-center">
										<FaShoppingBag className="h-5 w-5 mr-2 text-primary" />
										Visite nossa loja
									</h3>
									<p className="text-gray-700 mb-4">
										Venha conhecer nosso espaço físico e experimentar nossos produtos. Estamos esperando por você!
									</p>
									<div className="bg-purple-50 p-4 rounded-lg">
										<p className="text-sm font-medium">Escaneie o QR Code na loja para:</p>
										<ul className="text-sm text-gray-500 mt-2 space-y-1 list-disc list-inside">
											<li>Ver todos os produtos disponíveis</li>
											<li>Conhecer promoções exclusivas</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
