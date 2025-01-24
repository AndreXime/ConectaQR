import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

const freePointers = ['Acesso a plataforma toda e todos os seus recursos', 'Suporte da equipe tecnica'];

const advancePointers = [
	'Todos os beneficios do plano gratis',
	'Prioridade no suporte da equipe tecnica',
	'Prioridade na sugestão de novas funcionalidades para plataforma',
	'Ajudar a manter a plataforma',
];

export default function PricingPlans() {
	return (
		<>
			<section className="w-full py-24 px-4 content-center justify-center">
				<h2 className="text-3xl  text-center font-bold">Planos de assinatura disponiveis</h2>
				<div className="flex flex-col lg:flex-row lg:justify-center mt-2 w-full gap-8">
					<div className="card lg:w-1/4 mt-6 bg-base-300 shadow-xl hover:shadow-2xl">
						<div className="card-body pt-12 pb-16  items-center text-center ">
							<h2 className="card-title text-xl">Plano gratis</h2>
							<h2 className="font-bold mt-4 text-4xl">R$0</h2>
							<Link
								href="/start-designing"
								className="w-full">
								<button className="btn !hover:text-white hover:bg-primary btn-sm mt-8 w-full  btn-outline normal-case ">
									Começar agora
								</button>
							</Link>

							<ul className="text-left mt-4">
								{freePointers.map((p, k) => {
									return (
										<li
											key={k}
											className="mt-2">
											<FaCheck className="w-4 h-4 text-green-500 inline-block" /> {p}
										</li>
									);
								})}
							</ul>
						</div>
					</div>

					<div className="card lg:w-1/4 mt-6 bg-base-300 shadow-xl hover:shadow-2xl">
						<div className="card-body pt-12 pb-16 items-center  ">
							<h2 className="card-title text-xl text-center">Doador </h2>
							<h2 className="font-bold mt-4 text-4xl text-center inline-block">
								R$ 10
								<span className="text-xs align-middle font-light text-slate-500">/mês</span>
							</h2>
							<button className="btn btn-sm mt-8 btn-primary normal-case w-full">Torna-se doador</button>
							<ul className="text-left mt-4">
								{advancePointers.map((p, k) => {
									return (
										<li
											key={k}
											className="mt-2">
											<FaCheck className="w-4 h-4 text-green-500 inline-block" /> {p}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
