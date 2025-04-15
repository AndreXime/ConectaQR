import { Drawer } from '@/components/Home';
import '@Styles';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
	title: 'ConnectQR',
	description: 'Uma plataforma para você expor seus produtos ao clientes em sua loja agilizando a decisão de compra',
	keywords: ['Conectar', 'Produtos', 'Vitrine', 'Lojas', 'Vendas', 'Empresas'],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const tema = (await cookies()).get('tema')?.value;

	return (
		<html
			lang="pt-BR"
			data-theme={tema ?? 'corporate'}>
			<body>
				<Drawer theme={tema}>{children} </Drawer>
			</body>
		</html>
	);
}
