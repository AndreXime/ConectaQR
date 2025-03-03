'use client';

import type { Categoria } from '@/lib/types';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef, useState } from 'react';
import { FaDownload } from 'react-icons/fa';

export default function QRCode({ nomeEmpresa, categorias }: { nomeEmpresa: string; categorias: Categoria[] }) {
	const baseURL = `${process.env.NEXT_PUBLIC_DOMAIN}/${nomeEmpresa}`;
	const QRcodes = [
		{ title: 'Tela inicial', link: baseURL },
		{ title: 'Produtos', link: `${baseURL}/produtos` },
		...categorias.map((categoria) => ({
			title: `Categoria - ${categoria.nome}`,
			link: `${baseURL}/produtos?categoria=${categoria.nome}`,
		})),
	];

	const [currentQr, setCurrentQr] = useState(QRcodes[0]);

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const handleSwitch = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedTitle = event.target.value;
		const selectedQr = Object.values(QRcodes).find((qr) => qr.title === selectedTitle);
		if (selectedQr) setCurrentQr(selectedQr);
	};

	const downloadQRCode = () => {
		if (canvasRef.current) {
			const url = canvasRef.current.toDataURL('image/png'); // Converte para URL base64
			const a = document.createElement('a');
			a.href = url;
			a.download = `ConnectQR-${currentQr.title}-${nomeEmpresa}.png`;
			a.click();
		}
	};

	return (
		<main className="flex-grow container my-8 mx-auto flex flex-col items-center justify-center gap-12">
			<div>
				<fieldset className="fieldset text-center text-xl font-bold mb-3">
					<legend className="fieldset-legend">Escolha a pagina para gerar o QRCode</legend>
					<select
						onChange={handleSwitch}
						defaultValue={currentQr.title}
						className="select w-full font-bold">
						{QRcodes.map((qr) => (
							<option key={qr.title}>{qr.title}</option>
						))}
					</select>
				</fieldset>
				<div className="flex flex-col justify-center items-center">
					<QRCodeCanvas
						ref={canvasRef}
						value={currentQr.link}
						size={250}
					/>
					<button
						onClick={downloadQRCode}
						className="btn btn-primary mt-4 w-full">
						<FaDownload /> Baixar QRCode {currentQr.title}
					</button>
				</div>
			</div>
		</main>
	);
}
