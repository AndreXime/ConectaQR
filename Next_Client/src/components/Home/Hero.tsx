import Image from 'next/image';
import Link from 'next/link';

export default function hero() {
	return (
		<header className="hero py-10 bg-gradient-to-t from-blue-500 to-purple-700 min-h-dvh">
			<div className="hero-content px-4 max-w-6xl flex-col lg:flex-row-reverse">
				<Image
					width={800}
					height={800}
					priority={false}
					alt="Imagem do hero, uma pessoa olhando o celular dentro do supermercado"
					src={'/assets/hero.jpg'}
					className="hidden lg:block md:max-w-sm h-100 object-cover rounded-lg shadow-2xl"
				/>
				<div className="w-full lg:w-1/2 md:h-100 text-center md:text-left">
					<h1 className="text-3xl text-slate-100 font-bold md:leading-none leading-tight md:mt-0 mt-10">
						Crie sua própria página e exponha seus produtos em minutos!
					</h1>
					<p className="py-2 text-lg text-slate-100 mt-4 md:pr-12">
						Modernize seu negócio de forma gratuita! Com nossa plataforma, você cria sua vitrine online em poucos
						cliques e facilita o acesso dos seus clientes aos seus produtos.
					</p>
					<Link href="/acesso">
						<button className="btn text-lg mt-4 mb-6 px-12 btn-warning normal-case ">Começe agora</button>
					</Link>
					<h2 className="py-2 text-2xl font-semibold text-slate-100 mt-4 md:pr-12">
						Quer encontrar uma empresa parceira?
					</h2>
					<p className="py-2 text-lg text-slate-100 md:pr-12">
						Explore as empresas já cadastradas e aproveite para conhecer tudo o que nossa plataforma oferece.{' '}
					</p>
					<Link href="/empresas">
						<button className="btn text-lg mt-4 px-12 btn-warning normal-case "> Buscar empresas </button>
					</Link>
				</div>
			</div>
		</header>
	);
}
