import Image from 'next/image';
import Link from 'next/link';

export default function hero() {
	return (
		<header className="hero py-10 bg-gradient-to-t from-blue-500 to-purple-700 h-screen">
			<div className="hero-content md:px-0 px-4 max-w-6xl flex-col lg:flex-row-reverse">
				<Image
					width={800}
					height={800}
					alt="Imagem de um vitrine"
					src={'/hero.jpeg'}
					className="hidden lg:block md:max-w-sm h-80 object-cover rounded-lg shadow-2xl"
				/>
				<div className="w-full lg:w-1/2">
					<h1 className="text-4xl text-slate-100 font-bold md:leading-none leading-tight md:mt-0 mt-10">
						Tenha sua propria pagina de produtos em minutos!
					</h1>
					<p className="py-2 text-xl text-slate-100 mt-4 pr-12">
						Use nossa plataforma totalmente gratis modernizar seu negocio e facilitar seus clientes saberem de você.
					</p>
					<Link href="/start-designing">
						<button className="btn text-lg mt-4 mb-6 px-12 btn-accent normal-case">Começe agora</button>
					</Link>
					<h2 className="py-2 text-2xl font-semibold text-slate-100 mt-4 pr-12">
						Procurando uma empresa já cadastrada?
					</h2>
					<Link href="/empresas">
						<button className="btn text-lg mt-4 px-12 btn-accent normal-case">Procure aqui</button>
					</Link>
				</div>
			</div>
		</header>
	);
}
