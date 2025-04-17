'use client';
import { Drawer, Resumo, Produtos, Editar, QRCode } from '@/components/Painel';
import { useEmpresa } from '@/components/Painel/Context';
import { useEffect } from 'react';
import { BiMenu } from 'react-icons/bi';

export default function App() {
	const { Tab, EmpresaTema, setMobile, mobile } = useEmpresa();

	useEffect(() => {
		document.getElementById('root')?.setAttribute('data-theme', EmpresaTema);
	}, [Tab, EmpresaTema]);

	return (
		<div
			id="root"
			data-theme={EmpresaTema}
			className="flex h-screen bg-base-100">
			<Drawer />
			<div className="flex-1 flex flex-col overflow-hidden">
				<main className="flex-1 overflow-auto p-4 bg-base-200">
					{!mobile && (
						<BiMenu
							className="lg:hidden fixed right-4 z-50 cursor-pointer"
							size={29}
							onClick={() => setMobile(true)}
						/>
					)}
					{Tab === 'Inicio' && <Resumo />}
					{Tab === 'Editar' && <Editar />}
					{Tab === 'Produtos' && <Produtos />}
					{Tab === 'QRCode' && <QRCode />}
				</main>
			</div>
		</div>
	);
}
