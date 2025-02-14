import '@Styles';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'ConnectQR - Painel',
	description: 'Area da empresa configurar sua loja no ConnectQR',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<body>{children}</body>
		</html>
	);
}
