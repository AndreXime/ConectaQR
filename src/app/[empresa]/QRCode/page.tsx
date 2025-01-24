'use client';
import { Footer, Header } from '@/components/Empresa';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';

type PropsQR = {
	nomeEmpresa: string;
	QRcodes: { title: string; link: string }[];
};

const Page = () => {
	const [{ nomeEmpresa, QRcodes }, setData] = useState<PropsQR>({
		nomeEmpresa: '',
		QRcodes: [{ title: '', link: '' }],
	});

	useEffect(() => {
		const origin = typeof window !== 'undefined' ? window.location.origin : '';
		const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
		const nomeEmpresa = pathname.split('/')[1] || '';
		const link = `https://${origin}/${nomeEmpresa}`;

		const QRcodes = [
			{ title: 'Tela inicial', link: link },
			{ title: 'Produtos', link: `${link}/produtos` },
		];

		setData({ nomeEmpresa: nomeEmpresa, QRcodes: QRcodes });
	}, []);

	const downloadQRCode = (canvas: HTMLCanvasElement, title: string) => {
		if (canvas) {
			const url = canvas.toDataURL('image/png'); // Converte para URL base64
			const a = document.createElement('a');
			a.href = url;
			a.download = `ConnectQR-${title}-${nomeEmpresa}.png`;
			a.click();
		}
	};

	return (
		<div
			id="root"
			data-theme={'retro'}
			className="flex flex-col min-h-screen">
			<Header
				Icon={true}
				EmpresaName={nomeEmpresa}
				Tab={' - QRCodes'}
			/>
			<main className="flex-grow container my-8 mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
				{QRcodes.map((value, index) => (
					<div key={index}>
						<h2 className="text-center text-3xl font-bold mb-3">{value.title}</h2>
						<QRCodeCanvas
							id={`qrcode-${index}`}
							value={value.link}
							size={250}
						/>
						<button
							onClick={() => {
								const canvas = document.getElementById(`qrcode-${index}`) as HTMLCanvasElement;
								if (canvas) {
									downloadQRCode(canvas, value.title);
								}
							}}
							className="btn btn-primary mt-4 w-full">
							<FaDownload /> Baixar QRCode {value.title}
						</button>
					</div>
				))}
			</main>
			<Footer />
		</div>
	);
};

export default Page;
