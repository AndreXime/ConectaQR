import '@Styles';

type InfoType = {
	descricao?: string;
};

export async function generateMetadata({ params }: { params: Promise<{ empresa: string }> }) {
	const { empresa } = await params;

	const capitalize = empresa
		.split('-')
		.map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
		.join(' ');

	let info: InfoType | null = null;
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresas?nome=${empresa}`, {
			method: 'get',
			cache: 'force-cache',
			next: { revalidate: 5400 },
		});
		if (response.ok) {
			info = await response.json();
		}
	} catch {}

	return {
		title: `${capitalize} - Produtos`,
		description: info?.descricao || `Página oficial de ${capitalize} na plataforma`,
	};
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<body>{children}</body>
		</html>
	);
}
