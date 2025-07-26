import { Drawer } from '@/module/Home/components';
import '@Styles';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--font-roboto',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'ConectaQR',
    description: 'Uma plataforma para você expor seus produtos ao clientes em sua loja agilizando a decisão de compra',
    keywords: ['Conectar', 'Produtos', 'Vitrine', 'Lojas', 'Vendas', 'Empresas'],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" data-theme={'corporate'} className={roboto.variable}>
            <body>
                <Drawer />
                {children}
            </body>
        </html>
    );
}
