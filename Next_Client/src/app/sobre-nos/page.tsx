import { Drawer, Footer } from '@/components/Home';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';

const equipe = [
	{
		nome: 'André',
		cargo: 'Criador da plataforma',
		descricao:
			'Estudante de ciencias da computação, crie essa plataforma para ajudar meu pai na sua loja e escalei para mais do que isso',
		imagem: '/assets/andre.png',
		redes: [
			{ tipo: 'linkedin', url: '#' },
			{ tipo: 'github', url: '#' },
		],
	},
];

export default async function CompaniesPage() {
	let status = false;

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, { cache: 'no-store' });
		status = res.ok ? true : false;
	} catch {
		status = false;
	}

	const serverStatus = {
		online: status,
		lastChecked: new Date().toLocaleTimeString(),
		uptime: '90%',
		version: '1.8',
	};

	const renderIcon = (tipo: string) => {
		switch (tipo) {
			case 'twitter':
				return <FaTwitter className="h-5 w-5" />;
			case 'linkedin':
				return <FaLinkedin className="h-5 w-5" />;
			case 'github':
				return <FaGithub className="h-5 w-5" />;
			default:
				return null;
		}
	};
	return (
		<Drawer>
			<div className="flex min-h-[100dvh] flex-col">
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 ">
					<div className="px-4 md:px-6 text-center space-y-4">
						<h1 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500">
							Sobre a Plataforma
						</h1>
						<p className="max-w-[700px] mx-auto md:text-xl text-muted-foreground">
							Conheça a equipe por trás da ConectaQR e saiba mais sobre nossa missão
						</p>
					</div>
				</section>

				<section className="w-full py-12 md:py-24">
					<div className="px-5 md:px-10 grid gap-10 md:grid-cols-2">
						<div className="space-y-6">
							<h2 className="text-3xl font-bold">Nossa História</h2>
							<p className="text-muted-foreground">
								A ConectaQR nasceu em 2023 com uma missão clara: ajudar pequenos e médios comerciantes a terem presença
								digital sem a complexidade e os custos de um e-commerce completo.
							</p>
							<p className="text-muted-foreground">
								Percebemos que muitas lojas físicas queriam mostrar seus produtos online, mas não necessariamente vender
								pela internet. Elas precisavam de uma solução simples que funcionasse como uma extensão digital de suas
								vitrines físicas.
							</p>
							<p className="text-muted-foreground font-bold">
								A plataforma precisa de ajudar financeira para se manter online, qualquer quantia é bem vinda
							</p>
						</div>

						<div className="rounded-box shadow p-3 border border-base-300">
							<div className="bg-gradient-to-r from-purple-600 to-teal-500 text-white rounded-box p-4 mb-4">
								<h3 className="text-lg font-bold">Status do Servidor</h3>
								<p className="text-sm opacity-80">Informações em tempo real sobre nossa plataforma</p>
							</div>
							<div className="space-y-4">
								<div className="flex justify-between">
									<span className="font-medium">Status:</span>
									<span className={`badge ${serverStatus.online ? 'badge-success' : 'badge-error'}`}>
										{serverStatus.online ? 'Online' : 'Offline'}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium">Última verificação:</span>
									<span>{serverStatus.lastChecked}</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium">Uptime:</span>
									<span>{serverStatus.uptime}</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium">Versão:</span>
									<span>{serverStatus.version}</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="w-full py-12 md:py-24 bg-base-200">
					<div className="px-4 md:px-6">
						<h2 className="text-3xl font-bold text-center mb-12">Nossa Equipe</h2>
						<div className="flex flex-wrap justify-center items-center">
							{equipe.map((membro, idx) => (
								<div
									key={idx}
									className="rounded-box shadow border border-base-300 overflow-hidden w-[400px] ">
									<div className="relative aspect-square w-full">
										<Image
											src={membro.imagem}
											alt={membro.nome}
											fill
											className="object-cover"
										/>
									</div>
									<div className="p-4">
										<h3 className="font-semibold text-lg">{membro.nome}</h3>
										<p className="text-sm text-base-content/60">{membro.cargo}</p>
										<p className="mt-2 text-sm text-base-content/70">{membro.descricao}</p>
										<div className="flex gap-4 mt-4">
											{membro.redes.map((rede, i) => (
												<Link
													key={i}
													href={rede.url}
													className="text-base-content/60 hover:text-base-content">
													{renderIcon(rede.tipo)}
												</Link>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
				<Footer />
			</div>
		</Drawer>
	);
}
