import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import type { EmpresaPrivate } from '@/lib/types';
import { FaEdit, FaQuestionCircle } from 'react-icons/fa';
import themes from '@/lib/themes';
import Image from 'next/image';

type Props = {
	Data: EmpresaPrivate;
	setEmpresa: Dispatch<SetStateAction<EmpresaPrivate>>;
};
export default function Editar({ Data, setEmpresa }: Props) {
	const [Popup, setPopup] = useState(['', '']);

	const TemaDemo = async (value: string) => {
		document.getElementById('root')?.setAttribute('data-theme', value);
	};

	const [imagePreview, setImagePreview] = useState<string | undefined>(Data.foto);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					setImagePreview(e.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
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

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa`, {
				method: 'PATCH',
				credentials: 'include',
				body: formData,
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
		<section className="flex flex-col">
			<div className="card w-full bg-base-100 shadow-2xl">
				<div className="card-body px-5">
					<h2 className="text-2xl font-bold">Editar dados</h2>
					<span className="text-xs">Lembrete: salve suas alterações no final da pagina</span>
					<span className="text-xs">Dica: deixe em branco algum campo para remover ele</span>
					<form
						encType="multipart/form-data"
						onSubmit={handleSubmit}>
						<div className="join join-vertical mt-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
							<label className="form-control w-full max-w-xs mb-4">
								<div className="label">
									<span className="label-text">Nome da loja</span>
								</div>
								<input
									type="text"
									name="nome"
									className="input input-bordered w-full max-w-xs"
									defaultValue={Data.nome.split('-').join(' ')}
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
									<span className="label-text">Qual o @ do instagram da sua empresa?</span>
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
									<span className="label-text">Qual o seu WhatsApp para Clientes?</span>
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

							<label className="form-control w-full max-w-xs mb-4 ">
								<div className="label">
									<span className="label-text">Qual a sua cidade?</span>
								</div>
								<input
									type="text"
									name="cidade"
									className="input input-bordered w-full max-w-xs"
									defaultValue={Data.cidade}
									placeholder="Fortaleza, Ceará"
								/>
							</label>

							<label className="form-control w-full max-w-xs mb-4">
								<div className="label">
									<span className="label-text">Link do google maps</span>
									<button
										type="button"
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
							<div className="col-span-full flex items-center flex-col gap-3 mb-4">
								<span className="text-center text-lg label-text">Sua foto de perfil</span>
								<label
									htmlFor="fileUpload"
									className="flex justify-center items-center cursor-pointer rounded-2xl h-52 w-52 relative">
									<Image
										className="mask object-contain w-full h-full bg-base-200"
										src={imagePreview || '/assets/blankphoto.png'}
										width={200}
										height={200}
										alt="Sua foto de perfil"
									/>
									<FaEdit
										size={30}
										color="white"
										className="absolute glass p-1"
									/>
								</label>
								<input
									name="imagem"
									id="fileUpload"
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleImageChange}
								/>
							</div>
						</div>

						<span className="badge badge-sm badge-warning">35 temas para escolher!</span>
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
				id={'modal_maps'}
				className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg text-center">Como eu tenho o google maps na minha pagina?</h3>
					<div className="py-4">
						<ul>
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
							<button
								role="button"
								className="btn">
								Fechar
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</section>
	);
}
