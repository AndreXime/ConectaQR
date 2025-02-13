import QRCodeDownload from '@/components/Painel/QRCodeDownload';

export default function QRCode({ nomeEmpresa }: { nomeEmpresa: string }) {
	const baseURL = `https://${process.env.NEXT_PUBLIC_DOMAIN}/${nomeEmpresa}`;

	const QRcodes = [
		{ title: 'Tela inicial', link: baseURL },
		{ title: 'Produtos', link: `${baseURL}/produtos` },
	];

	return (
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
	);
}
