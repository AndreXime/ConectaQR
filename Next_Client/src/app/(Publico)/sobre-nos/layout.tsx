import '@Styles';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sobre a plataforma',
    description: 'Conheça nossa equipe e tecnologias usadas',
    keywords: ['Conectar', 'Produtos', 'Vitrine', 'Lojas', 'Vendas', 'Empresas'],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
