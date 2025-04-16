'use client';
import { Drawer, Resumo, Produtos, Editar, QRCode } from '@/components/Painel';
import { useEmpresa } from '@/components/Painel/Context';
import { useEffect } from 'react';

export default function App() {
	const { Tab, EmpresaTema } = useEmpresa();

	useEffect(() => {
		document.getElementById('root')?.setAttribute('data-theme', EmpresaTema);
	}, [Tab, EmpresaTema]);

	return (
		<div
			id="root"
			data-theme={EmpresaTema}
			className="min-h-screen bg-base-100">
			<Drawer>
				<main className="p-3">
					{Tab === 'Inicio' && <Resumo />}
					{Tab === 'Editar' && <Editar />}
					{Tab === 'Produtos' && <Produtos />}
					{Tab === 'QRCode' && <QRCode />}
				</main>
			</Drawer>
		</div>
	);
}
