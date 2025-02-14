import '@Styles';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
	title: 'Sobre a plataforma',
	description: 'Conheça nossa equipe e tecnologias usadas',
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
