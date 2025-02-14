import '@Styles';

export async function generateMetadata({ params }: { params: Promise<{ empresa: string }> }) {
	const { empresa } = await params;

	const capitalize = empresa
		.split('-')
		.map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
		.join(' ');

	return {
		title: `${capitalize} - Produtos`,
		description: `A ${capitalize} é muito boa`,
	};
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<body>{children}</body>
		</html>
	);
}
