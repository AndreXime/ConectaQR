'use client';
import { Footer, Header } from '@/components/Empresa';
import { notFound, usePathname } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';

const Page = () => {
	const [QRCodes, setQRCodes] = useState<{ title: string; link: string }[]>([]);
	const nomeEmpresa = usePathname()?.split('/')[1];

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const { origin } = window.location;
			setQRCodes([
				{ title: 'Tela inicial', link: `${origin}/${nomeEmpresa}` },
				{ title: 'Produtos', link: `${origin}/${nomeEmpresa}/produtos` },
			]);
		}
	}, [nomeEmpresa]);

	if (!nomeEmpresa) {
		return notFound();
	}

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
				{QRCodes.map((value, index) => (
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
