import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'ConnectQR - Empresas',
	description: 'Todas as empresas parceiras que estão presentes na nossa plataforma',
	keywords: ['Conectar', 'Produtos', 'Vitrine', 'Lojas', 'Vendas', 'Empresas'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<body>{children}</body>
		</html>
	);
}
