import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'ConnectQR - Acesso',
	description: 'Pagina de login do ConnectQR',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html data-theme={'light'}>
			<body>{children}</body>
		</html>
	);
}
