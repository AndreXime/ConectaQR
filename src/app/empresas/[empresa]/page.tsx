// Componente da página, usando parâmetros
export default async function Page({ params }: { params: Promise<{ empresa: string }> }) {
	const empresa = (await params).empresa;

	return (
		<div>
			<h1>Empresa: {empresa}</h1>
		</div>
	);
}
