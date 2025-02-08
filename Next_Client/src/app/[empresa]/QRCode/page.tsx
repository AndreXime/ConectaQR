import { Footer, Header } from '@/components/Empresa';
import QRCodeDownload from '@/components/Empresa/QRCode';

type PropsQR = {
	title: string;
	link: string;
};

export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{ empresa: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const nomeEmpresa = (await params).empresa;
	const baseURL = `https://${process.env.NEXT_PUBLIC_DOMAIN}/${nomeEmpresa}`;

	const QRcodes: PropsQR[] = [
		{ title: 'Tela inicial', link: baseURL },
		{ title: 'Produtos', link: `${baseURL}/produtos` },
	];

	const tema = (await searchParams)?.tema as string;

	return (
		<body
			data-theme={tema}
			className="flex flex-col min-h-screen">
			<Header
				Icon={true}
				EmpresaName={nomeEmpresa.split('-').join(' ')}
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
			<Footer temaAtual={tema} />
		</body>
	);
}
