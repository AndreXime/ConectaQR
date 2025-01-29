'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';
import { FaDownload } from 'react-icons/fa';

type QRCodeDownloadProps = {
	link: string;
	title: string;
	nomeEmpresa: string;
};

const QRCodeDownload: React.FC<QRCodeDownloadProps> = ({ link, title, nomeEmpresa }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const downloadQRCode = () => {
		if (canvasRef.current) {
			const url = canvasRef.current.toDataURL('image/png'); // Converte para URL base64
			const a = document.createElement('a');
			a.href = url;
			a.download = `ConnectQR-${title}-${nomeEmpresa}.png`;
			a.click();
		}
	};

	return (
		<div>
			<h2 className="text-center text-3xl font-bold mb-3">{title}</h2>
			<QRCodeCanvas
				ref={canvasRef}
				value={link}
				size={250}
			/>
			<button
				onClick={downloadQRCode}
				className="btn btn-primary mt-4 w-full">
				<FaDownload /> Baixar QRCode {title}
			</button>
		</div>
	);
};

export default QRCodeDownload;
