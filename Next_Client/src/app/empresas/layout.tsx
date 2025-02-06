import '@/styles/globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
	title: 'ConnectQR - Empresas',
	description: 'Todas as empresas parceiras que estão presentes na nossa plataforma',
	keywords: ['Conectar', 'Produtos', 'Vitrine', 'Lojas', 'Vendas', 'Empresas'],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies();
	const tema = cookieStore.get('tema');

	return (
		<html
			lang="pt-BR"
			data-theme={tema?.value ?? 'bumblebee'}>
			<body>{children}</body>
		</html>
	);
}
