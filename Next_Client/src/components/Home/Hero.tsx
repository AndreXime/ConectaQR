import Image from 'next/image';
import Link from 'next/link';

export default function hero() {
	return (
		<header className="hero py-10 bg-gradient-to-t from-blue-500 to-purple-700 min-h-[80dvh]">
			<div className="hero-content px-4 max-w-6xl flex-col lg:flex-row">
				<div className="w-full lg:w-1/2 md:h-100 text-center lg:text-left flex flex-col ">
					<div className="flex flex-col space-y-4">
						<div className="space-y-2">
							<h2 className="font-bold text-slate-100 text-3xl tracking-tighter sm:text-4xl md:text-5xl">
								Crie sua própria página e exponha seus produtos em minutos!
							</h2>
							<p className="max-w-[900px] text-slate-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
								Modernize seu negócio de forma gratuita! Com nossa plataforma, você cria sua vitrine online em poucos
								cliques e facilita o acesso dos seus clientes aos seus produtos.
							</p>
						</div>
					</div>

					<div className="flex justify-center lg:justify-start flex-wrap gap-3 mt-5">
						<Link href="/acesso">
							<button className="btn text-lg px-12 whitespace-nowrap btn-warning">Começar agora</button>
						</Link>

						<Link href="/empresas">
							<button className="btn text-lg px-12 whitespace-nowrap btn-warning">Buscar empresas</button>
						</Link>
					</div>
				</div>
				<Image
					width={800}
					height={800}
					priority={false}
					alt="Imagem do hero, uma pessoa olhando o celular dentro do supermercado"
					src={'/assets/hero.jpg'}
					className="md:max-w-sm h-100 object-cover rounded-lg shadow-2xl mt-5"
				/>
			</div>
		</header>
	);
}
