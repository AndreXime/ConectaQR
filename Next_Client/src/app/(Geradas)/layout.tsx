import '@Styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--font-roboto',
    display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" className={roboto.variable}>
            <body>{children}</body>
        </html>
    );
}
