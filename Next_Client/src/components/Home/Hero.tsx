import Image from 'next/image';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

export default function hero() {
	return (
		<section className="w-full pb-24 pt-12 lg:pb-32 lg:pt-16 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 ">
			<div className="px-4 md:px-12 relative">
				<div className="absolute inset-0 bg-grid-black/[0.02]  -z-10" />
				<div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
					<div className="flex flex-col justify-center space-y-4">
						<div className="space-y-2 ">
							<h1 className="text-center md:text-left text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500">
								Crie sua própria página e exponha seus produtos em minutos!
							</h1>
							<p className="text-center md:text-left max-w-[600px] text-muted-foreground md:text-xl text-black">
								Modernize seu negócio de forma gratuita! Com nossa plataforma, você cria sua vitrine online em poucos
								cliques e facilita o acesso dos seus clientes aos seus produtos.
							</p>
						</div>
						<div className="flex flex-col gap-2 min-[400px]:flex-row justify-center md:justify-start w-full">
							<Link
								href={'/acesso'}
								className="btn btn-outline p-2 flex-1 w-full bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-white border-0">
								Acessar agora
							</Link>
							<Link
								href={'/empresas'}
								className="btn btn-outline p-2 flex-1 w-full text-black border-purple-200  hover:bg-purple-50 ">
								<FaSearch className="mr-2 h-4 w-4 text-purple-500" />
								Buscar empresas
							</Link>
						</div>
					</div>
					<div className="mx-auto lg:ml-auto relative mt-5">
						<div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-teal-500 rounded-lg blur-md opacity-30"></div>
						<Image
							src="/assets/hero.jpg"
							alt="Imagem do hero, uma pessoa olhando o celular dentro do supermercado"
							width={550}
							height={550}
							className="rounded-lg object-contain relative"
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
