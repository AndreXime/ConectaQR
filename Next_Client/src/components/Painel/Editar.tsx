import { type Dispatch, type SetStateAction } from 'react';
import type { EmpresaCompleta } from '@/types/types';
import Modal from '../common/Modal';

type Props = {
	Data: EmpresaCompleta;
	setEmpresa: Dispatch<SetStateAction<EmpresaCompleta>>;
};
export default function Editar({ Data }: Props) {
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

	const TemaDemo = async (value: string) => {
		document.getElementById('root')?.setAttribute('data-theme', value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);

		console.log(formData);
	};

	const tips = {
		metadata: {
			title: 'O que é metadata?',
			message: [
				{
					title: 'Cartão de visita digital',
					message:
						'Quando alguém pesquisa seu site no Google, os metadados funcionam como um cartão de visita. Se você não tiver um título e uma descrição bem feitos, é como se entregasse um cartão em branco.',
				},
				{
					title: 'Mensagem no WhatsApp',
					message:
						'Já percebeu que, quando você manda um link no WhatsApp, às vezes aparece uma prévia bonitinha com imagem e descrição? Isso acontece por causa dos metadados. Sem eles, o link aparece seco e sem graça, e as pessoas podem nem se interessar em clicar.',
				},
			],
		},
		googlemaps: {
			title: 'Como eu tenho o google maps na minha pagina?',
			message: [
				{ message: 'Obtenha o código de incorporação' },
				{ message: 'Acesse Google Maps' },
				{ message: 'Busque o local desejado' },
				{ message: 'Clique em Compartilhar' },
				{ message: 'Vá até a aba Incorporar um mapa' },
				{ message: 'Copie o código <iframe>...</iframe>' },
			],
		},
	};

	return (
		<section className="flex flex-col gap-5">
			<div className="card w-full bg-base-100 shadow-2xl">
				<div className="card-body">
					<h2 className="text-2xl font-bold">Editar dados</h2>
					<span className="text-xs">Dica: salve suas alterações no final da pagina</span>
					<form onSubmit={handleSubmit}>
						<div className="join join-vertical mt-6 w-full grid grid-cols-1 md:grid-cols-3">
							<label className="form-control w-full max-w-xs mb-4">
								<div className="label">
									<span className="label-text">Nome da loja</span>
								</div>
								<input
									type="text"
									name="nome"
									className="input input-bordered w-full max-w-xs"
									defaultValue={Data.nome}
								/>
							</label>

							<label className="form-control w-full max-w-xs mb-4">
								<div className="label">
									<span className="label-text">Email para fazer login</span>
								</div>
								<input
									name="email"
									type="text"
									className="input input-bordered w-full max-w-xs"
									defaultValue={Data.email}
								/>
							</label>

							<label className="form-control w-full max-w-xs mb-4">
								<div className="label">
									<span className="label-text">Senha para login, deixe em branco para não alterar</span>
								</div>
								<input
									name="senha"
									type="text"
									className="input input-bordered w-full max-w-xs"
								/>
							</label>

							<label className="form-control w-full max-w-xs mb-4">
								<div className="label">
									<span className="label-text">Instagram da sua empresa</span>
								</div>
								<input
									name="instagram"
									type="text"
									className="input input-bordered w-full max-w-xs"
									defaultValue={Data.instagram}
								/>
							</label>

							<label className="form-control w-full max-w-xs mb-4">
								<div className="label">
									<span className="label-text">Telefone que seus clientes veram</span>
								</div>
								<input
									name="telefone"
									type="text"
									className="input input-bordered w-full max-w-xs"
									defaultValue={Data.telefone}
								/>
							</label>

							<label className="form-control w-full max-w-xs mb-4">
								<div className="label">
									<span className="label-text">Email de contato para clientes</span>
								</div>
								<input
									name="emailContato"
									type="text"
									className="input input-bordered w-full max-w-xs"
									defaultValue={Data.emailContato}
								/>
							</label>

							<label className="form-control w-full max-w-xs mb-4 ">
								<div className="label">
									<span className="label-text">Descrição para a pagina inicial da loja</span>
								</div>
								<textarea
									name="descricao"
									className="textarea w-full max-w-xs h-20"
									defaultValue={Data.descricao}
								/>
							</label>

							<label className="form-control w-full max-w-xs mb-4">
								<div className="label">
									<span className="label-text">Descrição curta para metadata</span>
									<Modal
										Title={tips.metadata.title}
										Message={tips.metadata.message}
									/>
								</div>
								<textarea
									name="descricaoCurta"
									className="textarea w-full max-w-xs h-20"
									defaultValue={Data.descricaoCurta}
								/>
							</label>

							<label className="form-control w-full max-w-xs mb-4">
								<div className="label">
									<span className="label-text">Link do google maps</span>
									<Modal
										Title={tips.googlemaps.title}
										Message={tips.googlemaps.message}
									/>
								</div>
								<textarea
									name="googlemaps"
									className="textarea w-full max-w-xs h-20"
									defaultValue={Data.maps}
									placeholder={'https://www.google.com/maps/embed....'}
								/>
							</label>
						</div>

						<span className="badge badge-sm badge-warning">Dezenas de temas!</span>
						<h2 className="text-2xl font-bold">Mude o tema</h2>
						<div className="mt-6 grid grid-cols-3 lg:grid-cols-12 gap-2 text-xs">
							{themes.map((value) => (
								<input
									data-theme={value}
									key={value}
									type="radio"
									name="temas"
									className="btn theme-controller col-span-1 capitalize"
									aria-label={value}
									value={value}
									onClick={() => {
										TemaDemo(value);
									}}
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
