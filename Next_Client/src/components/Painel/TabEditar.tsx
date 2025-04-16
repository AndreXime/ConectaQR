import { useState } from 'react';
import {
	FaEnvelope,
	FaInstagram,
	FaMapMarkerAlt,
	FaMapSigns,
	FaPhone,
	FaQuestionCircle,
	FaStore,
	FaUpload,
} from 'react-icons/fa';
import themes from '@/lib/themes';
import Image from 'next/image';
import { useEmpresa } from './Context';
import Popup, { MessageType } from '../common/Popup';
import { TbFileDescription } from 'react-icons/tb';
import { FaUserSecret } from 'react-icons/fa6';

export default function Editar() {
	const { setEmpresa, Empresa } = useEmpresa();

	const [imagePreview, setImagePreview] = useState<string | undefined>(Empresa.foto);
	const [messages, setMessages] = useState<MessageType[]>([]);

	const addMessage = (msg: string, status: 'success' | 'error') => {
		setMessages((prev) => [...prev, { id: Date.now(), text: msg, status: status }]);
	};

	const TemaDemo = async (value: string) => {
		document.getElementById('root')?.setAttribute('data-theme', value);
	};

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
				addMessage('Erro no servidor:' + message, 'error');
			} else {
				addMessage('Dados salvo com sucesso', 'success');
				setEmpresa(data);
				form.reset();
			}
		} catch (err) {
			addMessage('Erro no cliente:' + err, 'error');
		}
	};

	return (
		<div className="space-y-6 p-2 md:p-4">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">Editar Perfil</h2>
				<p className="text-gray-500">Atualize as informações da sua empresa.</p>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="grid gap-6">
					{/* Card: Foto de Perfil */}
					<div className="card bg-base-100 shadow-md">
						<div className="card-body">
							<div className="mb-4">
								<h2 className="card-title">Foto de Perfil</h2>
								<p className="text-sm text-gray-500">Esta imagem será exibida como logo da sua empresa.</p>
							</div>
							<div className="flex flex-col md:flex-row items-center gap-6">
								<div className=" border-black border-1 max-h-[200px] max-w-[200px] overflow-hidden">
									<Image
										src={imagePreview || '/assets/blankphoto.png'}
										alt="Avatar"
										width={400}
										height={400}
										className=" w-full h-full"
									/>
								</div>
								<div>
									<input
										name="imagem"
										id="imagem"
										type="file"
										accept="image/*"
										className="hidden"
										onChange={handleImageChange}
									/>
									<label
										htmlFor="imagem"
										className="btn btn-outline mb-2">
										<FaUpload className="mr-2 h-4 w-4" />
										Carregar nova imagem
									</label>

									<p className="text-xs text-gray-500 text-center">JPG, PNG ou Webp. Tamanho máximo de 3MB.</p>
								</div>
							</div>
						</div>
					</div>

					{/* Card: Informações Básicas */}
					<div className="card bg-base-100 shadow-md">
						<div className="card-body space-y-4">
							<div>
								<h2 className="card-title">Informações Básicas</h2>
								<p className="text-sm text-gray-500">Atualize as informações principais da sua empresa.</p>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="nome"
										className="label">
										<span className="label-text">Nome da Empresa</span>
									</label>
									<div>
										<label className="input w-full">
											<FaStore
												size={18}
												className="text-primary"
											/>
											<input
												id="nome"
												name="nome"
												type="text"
												className="grow"
												defaultValue={Empresa.nome}
											/>
										</label>
									</div>
								</div>
								<div>
									<label
										htmlFor="cidade"
										className="label">
										<span className="label-text">Endereço</span>
									</label>
									<div>
										<label className="input w-full">
											<FaMapSigns
												size={18}
												className="text-primary"
											/>
											<input
												id="cidade"
												name="cidade"
												type="text"
												className="grow"
												defaultValue={Empresa.cidade}
												placeholder="Cidade ou endereço da sua empresa"
											/>
										</label>
									</div>
								</div>
								<div>
									<label
										htmlFor="descricao"
										className="label">
										<span className="label-text">Descrição da Empresa</span>
									</label>
									<div>
										<label className="input w-full">
											<TbFileDescription
												size={18}
												className="text-primary"
											/>
											<input
												id="descricao"
												name="descricao"
												type="text"
												className="grow "
												defaultValue={Empresa.descricao}
											/>
										</label>
									</div>
								</div>
								<div>
									<label
										htmlFor="maps"
										className="label">
										<span className="label-text flex items-center flex-row gap-2">
											Link do Google Maps
											<FaQuestionCircle
												className="cursor-pointer"
												size={15}
												color="blue"
												onClick={() => (document.getElementById('modal_maps')! as HTMLDialogElement).showModal()}
											/>
										</span>
									</label>
									<div>
										<label className="input w-full">
											<FaMapMarkerAlt
												size={18}
												className="text-primary"
											/>
											<input
												id="maps"
												name="maps"
												type="text"
												className="grow"
												defaultValue={Empresa.maps}
												placeholder="<iframe>...</iframe>"
											/>
										</label>
									</div>
									<p className="text-xs text-gray-500">Cole aqui o link do Google Maps para sua localização.</p>
								</div>
							</div>
						</div>
					</div>

					{/* Card: Informações de Contato */}
					<div className="card bg-base-100 shadow-md">
						<div className="card-body space-y-4">
							<div>
								<h2 className="card-title">Informações de Contato</h2>
								<p className="text-sm text-gray-500">Atualize os dados de contato da sua empresa.</p>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<label
										htmlFor="telefone"
										className="label">
										<span className="label-text">Telefone</span>
									</label>
									<div>
										<label className="input">
											<FaPhone
												size={18}
												className="text-primary"
											/>
											<input
												id="telefone"
												name="telefone"
												type="text"
												className="grow"
												defaultValue={Empresa.telefone}
											/>
										</label>
									</div>
								</div>
								<div>
									<label
										htmlFor="emailContato"
										className="label">
										<span className="label-text">Email de Contato (Público)</span>
									</label>
									<div>
										<label className="input">
											<FaEnvelope
												size={18}
												className="text-primary"
											/>
											<input
												id="emailContato"
												name="emailContato"
												type="text"
												className="grow"
												defaultValue={Empresa.emailContato}
											/>
										</label>
									</div>
								</div>
								<div>
									<label
										htmlFor="instagram"
										className="label">
										<span className="label-text">Instagram</span>
									</label>
									<div>
										<label className="input">
											<FaInstagram
												size={18}
												className="text-primary"
											/>
											<input
												id="instagram"
												name="instagram"
												type="text"
												className="grow"
												defaultValue={Empresa.instagram}
											/>
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Card: Dados da Conta */}
					<div className="card bg-base-100 shadow-md">
						<div className="card-body space-y-4">
							<div>
								<h2 className="card-title">Dados da Conta</h2>
								<p className="text-sm text-gray-500">Atualize seu email administrativo e senha.</p>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="email"
										className="label">
										<span className="label-text">Email Administrativo</span>
									</label>
									<div>
										<label className="input">
											<FaEnvelope
												size={18}
												className="text-primary"
											/>
											<input
												id="email"
												name="email"
												type="text"
												className="grow"
												defaultValue={Empresa.email}
											/>
										</label>
									</div>
								</div>
								<div>
									<label
										htmlFor="senha"
										className="label">
										<span className="label-text">Senha</span>
									</label>
									<div>
										<label className="input">
											<FaUserSecret
												size={18}
												className="text-primary"
											/>
											<input
												id="senha"
												name="senha"
												type="text"
												className="grow"
												placeholder="********"
											/>
										</label>
									</div>
									<p className="text-xs text-gray-500">Deixe em branco para manter a senha atual.</p>
								</div>
							</div>
						</div>
					</div>

					{/* Card: Tema da Loja */}
					<div className="card bg-base-100 shadow-md">
						<div className="card-body">
							<div className="mb-4">
								<h2 className="card-title">Tema da Loja</h2>
								<p className="text-sm text-gray-500">Escolha um tema para personalizar a aparência da sua loja.</p>
							</div>
							<div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
								{themes.map((value) => (
									<input
										key={value}
										type="radio"
										name="tema"
										className="btn btn-primary capitalize relative cursor-pointer rounded-md p-2"
										data-theme={value}
										aria-label={value}
										defaultChecked={value === Empresa.tema}
										value={value}
										onClick={() => TemaDemo(value)}
									/>
								))}
							</div>
						</div>
					</div>

					{/* Botão para salvar alterações */}
					<div className="flex justify-center">
						<button
							type="submit"
							className="btn p-5 btn-primary">
							Salvar Alterações
						</button>
					</div>
				</div>
			</form>
			<dialog
				id={'modal_maps'}
				className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg text-center">Como eu consigo o link do google maps para minha pagina?</h3>
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
			<Popup
				messages={messages}
				setMessages={setMessages}
			/>
		</div>
	);
}
/*
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
									defaultValue={Empresa.nome.split('-').join(' ')}
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
									defaultValue={Empresa.email}
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
									defaultValue={Empresa.instagram}
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
									defaultValue={Empresa.telefone}
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
									defaultValue={Empresa.emailContato}
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
									defaultValue={Empresa.descricao}
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
									defaultValue={Empresa.cidade}
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
									defaultValue={Empresa.maps}
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

						<span className="badge badge-sm badge-warning">21 temas para escolher!</span>
						<h2 className="text-2xl font-bold">Mude o tema</h2>
						<div className="mt-6 grid grid-cols-3 lg:grid-cols-7 gap-2 text-xs">
							{themes.map((value) => (
								<input
								key={value}
								type="radio"
								name="tema"
								className="btn btn-primary capitalize"
								data-theme={value}
									aria-label={value}
									defaultChecked={value === Empresa.tema}
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
			<Popup
				messages={messages}
				setMessages={setMessages}
			/>
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
		*/
