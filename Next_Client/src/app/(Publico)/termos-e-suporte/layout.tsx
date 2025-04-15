import '@Styles';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Termos e Suporte',
	description: 'Os termos da pagina e duvidas frequentes',
	keywords: ['Conectar', 'Produtos', 'Vitrine', 'Lojas', 'Vendas', 'Empresas'],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return <>{children};</>;
}
