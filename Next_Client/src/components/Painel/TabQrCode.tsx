'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { useRef, useState } from 'react';
import { FaCheck, FaDownload } from 'react-icons/fa';
import { useEmpresa } from './Context';

export default function QRCode() {
	const { Categorias, EmpresaNome } = useEmpresa();
	const baseURL = `${process.env.NEXT_PUBLIC_DOMAIN}/${EmpresaNome}`;

	const [qrSize, setQrSize] = useState(200);
	const [qrColor, setQrColor] = useState('#000000');
	const [qrTab, setQrTab] = useState('basico');
	const [qrCorrection, setQrCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('L');
	const [currentQr, setCurrentQr] = useState({ title: 'Tela inicial', link: baseURL });

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const QRcodes = [
		{ title: 'Tela inicial', link: baseURL },
		{ title: 'Produtos', link: `${baseURL}/produtos` },
		...Categorias.map((categoria) => ({
			title: `Categoria - ${categoria.nome}`,
			link: `${baseURL}/produtos?categoria=${categoria.nome}`,
		})),
	];

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
			a.download = `ConnectQR-${currentQr.title}-${EmpresaNome}.png`;
			a.click();
		}
	};

	const colorOptions = [
		{ value: '#8b5cf6', label: 'Roxo', class: 'bg-purple-500' },
		{ value: '#3b82f6', label: 'Azul', class: 'bg-blue-500' },
		{ value: '#10b981', label: 'Verde', class: 'bg-green-500' },
		{ value: '#f59e0b', label: 'Âmbar', class: 'bg-amber-500' },
		{ value: '#ef4444', label: 'Vinho', class: 'bg-red-800' },
		{ value: '#000000', label: 'Preto', class: 'bg-black' },
	];

	return (
		<main className="flex-grow py-5 flex flex-col justify-center gap-4">
			<div className="mb-4">
				<h2 className="text-3xl font-bold">Gerar QR Code</h2>
				<p className="text-gray-500">Crie e personalize o QR Code da sua loja para compartilhar com seus clientes.</p>
			</div>
			<div className="grid gap-6 md:grid-cols-2">
				{/* Card de Personalização */}
				<div className="card bg-base-100 shadow-xl min:h-150">
					<div className="card-body">
						<h2 className="card-title flex-col">
							Personalizar QR Code
							<p className="text-gray-500 text-base">Ajuste as configurações do seu QR Code.</p>
						</h2>

						{/* Tabs */}
						<div className="tabs mb-2 font-bold flex justify-center">
							<button
								className={`tab tab-bordered ${qrTab === 'basico' ? 'tab-active' : ''}`}
								onClick={() => setQrTab('basico')}>
								Básico
							</button>
							<button
								className={`tab tab-bordered ${qrTab === 'avancado' ? 'tab-active' : ''}`}
								onClick={() => setQrTab('avancado')}>
								Avançado
							</button>
						</div>

						{/* Conteúdo das Abas */}
						{qrTab === 'basico' && (
							<div className="space-y-6">
								<div>
									<legend className="fieldset-legend">Pagina da loja para gerar o QRCode</legend>
									<select
										onChange={handleSwitch}
										defaultValue={currentQr.title}
										className="select w-full">
										{QRcodes.map((qr) => (
											<option key={qr.title}>{qr.title}</option>
										))}
									</select>
								</div>
								{/* Tamanho */}
								<div>
									<label className="label">
										<span className="label-text mb-1">Tamanho do QRCode</span>
									</label>
									<div className="flex items-center space-x-4">
										<input
											type="range"
											value={qrSize}
											min={100}
											max={400}
											step={10}
											onChange={(e) => setQrSize(Number(e.target.value))}
											className="range range-primary flex-1"
										/>
										<span className="w-12 text-center">{qrSize}px</span>
									</div>
								</div>

								{/* Cor */}
								<div>
									<label className="label">
										<span className="label-text mb-1">Cor do QRCode</span>
									</label>
									<div className="grid grid-cols-3 gap-2">
										{colorOptions.map((color) => (
											<div
												key={color.value}
												className={`relative cursor-pointer rounded-md p-1 flex items-center justify-center ${
													qrColor === color.value ? 'ring-2 ring-purple-600 ring-offset-2' : 'hover:bg-gray-200'
												}`}
												onClick={() => setQrColor(color.value)}>
												<div className={`w-6 h-6 rounded-full ${color.class} mr-1`}></div>
												<span className="text-xs">{color.label}</span>
												{qrColor === color.value && (
													<div className="absolute -top-2 -right-2 bg-purple-600 rounded-full p-0.5">
														<FaCheck className="h-3 w-3 text-white" />
													</div>
												)}
											</div>
										))}
									</div>
								</div>
							</div>
						)}

						{/* Nível de Correção de Erros */}
						{qrTab === 'avancado' && (
							<div className="mb-auto">
								<label className="label">
									<span className="label-text">Nível de Correção de Erros</span>
								</label>
								<div className="grid grid-cols-2 gap-2">
									{['L', 'M', 'Q', 'H'].map((level) => (
										<div
											key={level}
											className="flex items-center space-x-2">
											<input
												type="radio"
												name="correction"
												id={level}
												value={level}
												defaultChecked={level === 'L'}
												onChange={() => setQrCorrection(level as 'L' | 'M' | 'Q' | 'H')}
												className="radio radio-primary"
											/>
											<label
												htmlFor={level}
												className="cursor-pointer text-sm">
												{level === 'L'
													? 'Baixo (7%)'
													: level === 'M'
													? 'Médio (15%)'
													: level === 'Q'
													? 'Alto (25%)'
													: 'Máximo (30%)'}
											</label>
										</div>
									))}
								</div>
								<p className="text-xs text-gray-500 mt-1">
									Níveis mais altos de correção permitem que o QR Code seja lido mesmo se estiver parcialmente
									danificado.
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Card de Visualização */}
				<div className="card bg-base-100 shadow-xl min:h-150">
					<div className="card-body items-center">
						<h2 className="card-title">Visualização</h2>
						<p className="text-gray-500 mb-4">Veja como ficará seu QR Code.</p>
						<div
							className="border rounded-md p-4 bg-white"
							style={{ width: `${qrSize + 32}px`, height: `${qrSize + 32}px` }}>
							<div className="flex items-center justify-center w-full h-full">
								<QRCodeCanvas
									level={qrCorrection}
									fgColor={qrColor}
									ref={canvasRef}
									value={currentQr.link}
									size={qrSize}
								/>
							</div>
						</div>
						<p className="text-sm text-gray-500 mt-4 text-center">Escaneie este QR Code para acessar sua loja online</p>
					</div>
					<div className="card-actions justify-center pb-4">
						<button
							onClick={downloadQRCode}
							className="btn btn-outline">
							<FaDownload className="mr-2" />
							Baixar
						</button>
					</div>
				</div>
			</div>

			{/* Card de Como Usar */}
			<div className="card bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title">Como Usar</h2>
					<p className="text-gray-500 mb-4">Dicas para utilizar seu QR Code de forma eficiente.</p>
					<div className="grid gap-4 md:grid-cols-3">
						<div className="border rounded-md p-4">
							<h3 className="font-medium mb-2">Impressão</h3>
							<p className="text-sm text-gray-500">
								Imprima seu QR Code em materiais promocionais, cartões de visita, cardápios ou na vitrine da sua loja
								física.
							</p>
						</div>
						<div className="border rounded-md p-4">
							<h3 className="font-medium mb-2">Redes Sociais</h3>
							<p className="text-sm text-gray-500">
								Compartilhe seu QR Code nas redes sociais para que seus seguidores possam acessar sua loja online.
							</p>
						</div>
						<div className="border rounded-md p-4">
							<h3 className="font-medium mb-2">Email Marketing</h3>
							<p className="text-sm text-gray-500">
								Inclua o QR Code em suas campanhas de email marketing para direcionar os clientes para sua loja.
							</p>
						</div>
					</div>
					<div className="bg-gray-200 p-4 rounded-md mt-4">
						<p className="text-sm">
							<strong>Dica:</strong> Sempre teste seu QR Code antes de distribuí-lo para garantir que ele funcione
							corretamente em diferentes dispositivos.
						</p>
					</div>
				</div>
			</div>
			<div className="hidden">
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
						fgColor="blue"
						ref={canvasRef}
						value={currentQr.link}
						size={qrSize}
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
