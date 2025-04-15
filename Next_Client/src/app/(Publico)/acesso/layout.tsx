import '@Styles';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'ConnectQR - Acesso',
	description: 'Pagina de login do ConnectQR',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return <>{children};</>;
}
