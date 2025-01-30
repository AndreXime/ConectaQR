import type { Dispatch, SetStateAction } from 'react';

type DataType = {
	nome: string;
	desc: string;
	tema: string;
	qtdProdutos: string;
	categorias: string[];
};

type Props = {
	Data: DataType;
	setData: Dispatch<SetStateAction<DataType>>;
};

export default function Resumo({ Data, setData }: Props) {
	const themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter',
		'dim',
		'nord',
		'sunset',
		'caramellatte',
		'abyss',
		'silk',
	];

	return (
		<section className="flex flex-col gap-5">
			<h2 className="text-2xl text-center font-semibold mb-2"> Resumo rapido dos dados da empresa </h2>
			<div className="stats shadow stats-vertical md:stats-horizontal">
				<div className="stat place-items-center">
					<div className="stat-title">Nome publico</div>
					<div className="stat-value">{Data.nome}</div>
				</div>

				<div className="stat place-items-center">
					<div className="stat-title">Categorias registradas</div>
					<div className="stat-value text-sm text-secondary whitespace-normal line-clamp-2">{Data.desc}</div>
				</div>
			</div>
			<div className="stats shadow stats-vertical md:stats-horizontal">
				<div className="stat place-items-center">
					<div className="stat-title">Quantidade de produtos</div>
					<div className="stat-value">{Data.qtdProdutos}</div>
				</div>

				<div className="stat place-items-center">
					<div className="stat-title">Categorias registradas</div>
					<div className="stat-value text-secondary">{Data.categorias.length}</div>
				</div>

				<div className="stat place-items-center">
					<div className="stat-title">Tema da loja</div>
					<div className="stat-value capitalize">{Data.tema}</div>
				</div>
			</div>
			<div className="card w-full bg-base-100 shadow">
				<div className="card-body">
					<span className="badge badge-xs badge-warning">Dezenas de temas!</span>
					<div className="flex justify-between">
						<h2 className="text-3xl font-bold">Mude o tema da sua loja</h2>
					</div>
					<div className="join join-vertical mt-6 grid grid-cols-3 lg:grid-cols-12 gap-2 text-xs">
						{themes.map((value) => (
							<input
								data-theme={value}
								key={value}
								type="radio"
								name="theme-buttons"
								className="btn theme-controller join-item col-span-1 capitalize"
								aria-label={value}
								value={value}
							/>
						))}
					</div>
					<button
						onClick={() =>
							setData((prevData) => ({
								...prevData,
								tema: 'Construindo', // Atualiza apenas Info
							}))
						}
						className="btn btn-primary mt-5">
						Salvar
					</button>
				</div>
			</div>
		</section>
	);
}
