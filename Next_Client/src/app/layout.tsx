import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'ConnectQR',
	description: 'Uma plataforma para você expor seus produtos ao clientes em sua loja agilizando a decisão de compra',
	keywords: ['Conectar', 'Produtos', 'Vitrine', 'Lojas', 'Vendas', 'Empresas'],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<body>{children}</body>
		</html>
	);
}
