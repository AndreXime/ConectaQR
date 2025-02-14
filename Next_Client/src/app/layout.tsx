import '@Styles';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
	title: 'ConnectQR',
	description: 'Uma plataforma para você expor seus produtos ao clientes em sua loja agilizando a decisão de compra',
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
