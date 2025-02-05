import type { Dispatch, FormEvent, SetStateAction } from 'react';

type DataType = {
	nome: string;
	desc: string;
	tema: string;
	qtdProdutos: string;
};

type Props = {
	Data: DataType;
	setInfo: Dispatch<SetStateAction<DataType>>;
};
export default function Editar({ Data, setInfo }: Props) {
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

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const tema = formData.get('temas') as string | null;

		if (tema) setInfo((prevData) => ({ ...prevData, tema: tema }));
	};

	return (
		<section className="flex flex-col gap-5">
			<h2 className="text-2xl text-center font-semibold mb-2"> Edite tudo sobre sua loja </h2>

			<div className="card w-full bg-base-100 shadow-2xl">
				<div className="card-body">
					<h2 className="text-2xl font-bold">Editar dados</h2>
					<span className="text-xs">Dica: salve suas alterações</span>
					<div className="join join-vertical mt-6 w-full grid grid-cols-1 md:grid-cols-3">
						<label className="form-control w-full max-w-xs mb-4">
							<div className="label">
								<span className="label-text">Mude o nome da loja</span>
							</div>
							<input
								type="text"
								className="input input-bordered w-full max-w-xs"
								defaultValue={Data.nome}
							/>
						</label>

						<label className="form-control w-full max-w-xs mb-4">
							<div className="label">
								<span className="label-text">Mude sua descrição</span>
							</div>
							<textarea
								className="textarea w-full max-w-xs h-32"
								defaultValue={Data.desc}></textarea>
						</label>

						<label className="form-control w-full max-w-xs mb-8">
							<div className="label">
								<span className="label-text">Informações de contato</span>
							</div>
							<textarea
								className="textarea w-full max-w-xs h-32"
								defaultValue={Data.desc}></textarea>
						</label>
					</div>
					<form
						key={'Temas Form'}
						onSubmit={handleSubmit}>
						<span className="badge badge-sm badge-warning">Dezenas de temas!</span>
						<h2 className="text-2xl font-bold">Mude o tema</h2>
						<div className="join join-vertical mt-6 grid grid-cols-3 lg:grid-cols-12 gap-2 text-xs">
							{themes.map((value) => (
								<input
									data-theme={value}
									key={value}
									type="radio"
									name="temas"
									className="btn theme-controller join-item col-span-1 capitalize"
									aria-label={value}
									value={value}
								/>
							))}
						</div>
						<button
							type="submit"
							className="btn btn-primary mt-5 w-full">
							Salvar todas alterações
						</button>
					</form>
				</div>
			</div>

			<div className="card w-full bg-base-100 shadow"></div>
		</section>
	);
}
