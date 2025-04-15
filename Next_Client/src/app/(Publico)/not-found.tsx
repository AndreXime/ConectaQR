import '@Styles';
import Link from 'next/link';

export default async function NotFound() {
	return (
		<div className="flex justify-center flex-col items-center min-h-screen p-5">
			<h1 className="text-3xl text-center font-bold">Oops! Essa página não encontrada</h1>
			<h1 className="text-2xl text-center mt-2 mb-5">
				A pagina você busca não existe ou não está acessivel no momento
			</h1>
			<Link
				className="btn btn-primary"
				role="Button"
				href={'/'}>
				Voltar para tela inicial
			</Link>
		</div>
	);
}
