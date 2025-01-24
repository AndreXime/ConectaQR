import Link from 'next/link';

export default function app() {
	return (
		<div className="flex justify-center flex-col items-center h-screen">
			<h1 className="text-4xl text-center">404</h1>
			<h1 className="text-3xl text-center mt-2 mb-5">Oops! Parece que você encontrou um canto secreto do site.</h1>
			<Link
				className="btn btn-primary btn-lg"
				href={'/'}>
				Voltar para tela inicial
			</Link>
		</div>
	);
}
