import '@/styles/globals.css';

export async function generateMetadata({ params }: { params: Promise<{ empresa: string }> }) {
	const { empresa } = await params;

	return {
		title: empresa,
		description: `A empresa ${empresa} é muito boa`,
	};
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <html lang="pt-BR">{children}</html>;
}
