import { Footer, Header } from '@/components/Empresa';
import QRCodeDownload from '@/components/Empresa/QRCode';

type PropsQR = {
	title: string;
	link: string;
};

export default async function Page({ params }: { params: Promise<{ empresa: string }> }) {
	const nomeEmpresa = (await params).empresa;
	const baseURL = `https://${process.env.NEXT_PUBLIC_DOMAIN || 'meusite.com'}/${nomeEmpresa}`;

	const QRcodes: PropsQR[] = [
		{ title: 'Tela inicial', link: baseURL },
		{ title: 'Produtos', link: `${baseURL}/produtos` },
	];

	return (
		<body
			data-theme={'retro'}
			className="flex flex-col min-h-screen">
			<Header
				Icon={true}
				EmpresaName={nomeEmpresa}
				Tab={' - QRCodes'}
			/>
			<main className="flex-grow container my-8 mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
				{QRcodes.map((value, index) => (
					<QRCodeDownload
						key={index}
						link={value.link}
						title={value.title}
						nomeEmpresa={nomeEmpresa}
					/>
				))}
			</main>
			<Footer />
		</body>
	);
}
