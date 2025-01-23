import '@/styles/globals.css';

export async function generateMetadata({ params }: { params: Promise<{ empresa: string }> }) {
	const { empresa } = await params;

	return {
		title: `${empresa} - Produtos`,
		description: `A ${empresa} é muito boa`,
	};
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<body>{children}</body>
		</html>
	);
}
