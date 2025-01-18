import Link from 'next/link';

export default function hero() {
	return (
		<header className="hero py-12 bg-gradient-to-t from-blue-500 to-purple-700 pt-10 h-screen">
			<div className="hero-content md:px-0 px-4 max-w-6xl flex-col lg:flex-row-reverse">
				<img
					src="https://plus.unsplash.com/premium_photo-1681319553238-9860299dfb0f?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3"
					className="hidden md:block md:max-w-sm h-80 object-cover rounded-lg shadow-2xl"
				/>
				<div>
					<h1 className="text-4xl text-slate-100 font-bold md:leading-none leading-tight md:mt-0 mt-10">
						Tenha sua propria pagina <br />
						de produtos em minutos!
					</h1>
					<p className="py-2 text-xl text-slate-100 mt-4 pr-12">
						Use nossa plataforma totalmente gratis modernizar seu negocio <br />e facilitar seus clientes saberem de
						você.
					</p>
					<Link href="/start-designing">
						<button className="btn text-lg mt-4 px-12 btn-accent normal-case">Começe agora</button>
					</Link>
					<p className="py-2 text-xl text-slate-100 mt-4 pr-12">Procurando uma empresa já cadastrada?</p>
					<Link href="/start-designing">
						<button className="btn text-lg mt-4 px-12 btn-accent normal-case">Clique aqui</button>
					</Link>
				</div>
			</div>
		</header>
	);
}
