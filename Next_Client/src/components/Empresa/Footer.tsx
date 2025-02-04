'use client';
import { useEffect, useState } from 'react';

export default function Footer() {
	const [temaAtual, setTemaAtual] = useState('Não encontrado');

	useEffect(() => {
		const tema =
			document.documentElement.getAttribute('data-theme') ||
			document.getElementById('root')?.getAttribute('data-theme') ||
			'Não foi possivel determinar';
		setTemaAtual(tema);
	}, []);

	return (
		<footer className="bg-base-300 text-base-content p-4">
			<div className="container mx-auto text-center">
				<p>
					Tema atual: <span className="capitalize">{temaAtual}</span>
				</p>
				<p>ConectaQR - Todos os direitos reservados. &copy; {new Date().getFullYear()} </p>
			</div>
		</footer>
	);
}
