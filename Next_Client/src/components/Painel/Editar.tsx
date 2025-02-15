import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import type { EmpresaCompleta } from '@/types/types';
import { FaQuestionCircle } from 'react-icons/fa';

type Props = {
	Data: EmpresaCompleta;
	setEmpresa: Dispatch<SetStateAction<EmpresaCompleta>>;
};
export default function Editar({ Data, setEmpresa }: Props) {
	const [Popup, setPopup] = useState(['', '']);
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

	useEffect(() => {
		if (Popup[0]) {
			const timer = setTimeout(() => {
				setPopup(['', '']);
			}, 10000);

			return () => clearTimeout(timer);
		}
	}, [Popup]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const formInputs = Object.fromEntries(formData.entries());

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(formInputs),
			});

			const { message, data } = await response.json();
			if (!response.ok) {
				setPopup(['error', message]);
			} else {
				setPopup(['success', 'Dados salvo com sucesso']);
				setEmpresa(data);
				form.reset();
			}
		} catch (err) {
			setPopup(['error', 'Erro interno no servidor ' + err]);
		}
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
									placeholder="*********"
									className="input input-bordered w-full max-w-xs"
								/>
							</label>

							<label className="form-control w-full max-w-xs mb-4">
								<div className="label">
									<span className="label-text">Qual o @ do instagram da sua empresa</span>
								</div>
								<input
									name="instagram"
									type="text"
									placeholder="@suaempresa"
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
									placeholder="(88) 98XXXXXX"
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
									placeholder="emaildecontato@email.com"
									className="input input-bordered w-full max-w-xs"
									defaultValue={Data.emailContato}
								/>
							</label>

							<label className="form-control w-full max-w-xs mb-4 ">
								<div className="label">
									<span className="label-text">Descrição para a pagina inicial da loja</span>
								</div>
								<input
									type="text"
									name="descricao"
									className="input input-bordered w-full max-w-xs"
									defaultValue={Data.descricao}
								/>
							</label>

							<label className="form-control w-full max-w-xs mb-4">
								<div className="label">
									<span className="label-text">Descrição curta para metadata</span>
									<button
										className={`cursor-pointer`}
										onClick={() => (document.getElementById('modal_metadata')! as HTMLDialogElement).showModal()}>
										<FaQuestionCircle
											color="blue"
											size={15}
										/>
									</button>
								</div>
								<input
									type="text"
									name="descricaoCurta"
									className="input input-bordered w-full max-w-xs"
									defaultValue={Data.descricaoCurta}
								/>
							</label>

							<label className="form-control w-full max-w-xs mb-4">
								<div className="label">
									<span className="label-text">Link do google maps</span>
									<button
										className={`cursor-pointer`}
										onClick={() => (document.getElementById('modal_maps')! as HTMLDialogElement).showModal()}>
										<FaQuestionCircle
											color="blue"
											size={15}
										/>
									</button>
								</div>
								<input
									name="maps"
									type="text"
									className="input input-bordered w-full max-w-xs"
									defaultValue={Data.maps}
									placeholder={'https://www.google.com/maps/embed....'}
								/>
							</label>
						</div>

						<span className="badge badge-sm badge-warning">30 temas para escolher!</span>
						<h2 className="text-2xl font-bold">Mude o tema</h2>
						<div className="mt-6 grid grid-cols-3 lg:grid-cols-12 gap-2 text-xs">
							{themes.map((value) => (
								<input
									data-theme={value}
									key={value}
									type="radio"
									name="tema"
									className="btn theme-controller col-span-1 capitalize"
									aria-label={value}
									defaultChecked={value === Data.tema}
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
			{Popup[0] && (
				<div className="toast toast-top toast-start">
					<div className={`alert alert-${Popup[0]}`}>
						<span>{Popup[1]}</span>
					</div>
				</div>
			)}
			<dialog
				id={'modal_metadata'}
				className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg text-center">O que é metadata?</h3>
					<div className="py-4">
						<p>
							<strong>Cartão de visita digital: </strong>
							Quando alguém pesquisa seu site no Google, os metadados funcionam como um cartão de visita. Se você não
							tiver um título e uma descrição bem feitos, é como se entregasse um cartão em branco.
						</p>
						<p>
							<strong>Mensagem no WhatsApp: </strong>
							Já percebeu que, quando você manda um link no WhatsApp, às vezes aparece uma prévia bonitinha com imagem e
							descrição? Isso acontece por causa dos metadados. Sem eles, o link aparece seco e sem graça, e as pessoas
							podem nem se interessar em clicar.
						</p>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button className="btn">Fechar</button>
						</form>
					</div>
				</div>
			</dialog>
			<dialog
				id={'modal_maps'}
				className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg text-center">Como eu tenho o google maps na minha pagina?</h3>
					<div className="py-4">
						<ul>
							<li>Obtenha o código de incorporação</li>
							<li>Acesse Google Maps</li>
							<li>Busque o local da sua loja</li>
							<li>Clique em Compartilhar</li>
							<li>Vá até a aba Incorporar um mapa</li>
							<li>{'Copie o código <iframe>...</iframe>'}</li>
							<li>Cole o codigo que damos conta de extrair o link</li>
						</ul>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button className="btn">Fechar</button>
						</form>
					</div>
				</div>
			</dialog>
		</section>
	);
}
