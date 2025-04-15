import { useState } from 'react';
import { FaSave, FaTrash, FaUpload } from 'react-icons/fa';
import type { Produto, Categoria } from '@/lib/types';
import { Tabela } from './index';
import { useEmpresa } from './Context';
import Popup, { MessageType } from '../common/Popup';

export default function Produtos() {
	const { setProdutosData, Categorias, setCategorias } = useEmpresa();
	const [file, setFile] = useState<File | null>(null);
	const [EditandoProduto, setEditandoProduto] = useState<Produto>();
	const [EditandoCategoria, setEditandoCategoria] = useState<Categoria>();
	const [Carregando, setCarregando] = useState(false);
	const [messages, setMessages] = useState<MessageType[]>([]);

	const addMessage = (msg: string, status: 'success' | 'error') => {
		setMessages((prev) => [...prev, { id: Date.now(), text: msg, status: status }]);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0] || null;
		setFile(selectedFile);
	};

	const handleCategoriaSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const nome = String(formData.get('categoria'));

		if (nome.length === 0) {
			addMessage('Nenhum nome foi fornecido', 'error');
			return;
		}

		setCarregando(true);
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ nome }),
			});
			const { message, data } = await response.json();
			setCarregando(false);

			if (!response.ok) {
				addMessage('Erro no servidor: ' + message, 'error');
			} else {
				addMessage('Categoria salva com sucesso: ', 'success');
				setCategorias((prevItems) => [...prevItems, data]);
				form.reset();
			}
		} catch (err) {
			addMessage('Erro no cliente: ' + err, 'error');
		}
	};

	const handleCategoriaUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const nome = String(formData.get('nome'));
		const categoriaId = String(formData.get('categoriaId'));

		if (nome.length === 0 || !categoriaId) {
			addMessage('Um campo não foi fornecido', 'error');
			return;
		}

		setCarregando(true);
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ nome, categoriaId }),
			});
			const { message, data } = await response.json();
			setCarregando(false);

			if (!response.ok) {
				addMessage('Erro no servidor: ' + message, 'error');
			} else {
				addMessage('Categoria atualizada com sucesso!', 'success');
				setCategorias((prev) => prev.map((categoria) => (categoria.id === data.id ? { ...data } : categoria)));
				setEditandoCategoria(data);
				form.reset();
			}
		} catch (err) {
			addMessage('Erro no cliente: ' + err, 'error');
		}
	};

	const handleCategoriaDelete = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const id = String(formData.get('categoriaId'));
		const newId = String(formData.get('newId'));

		if (id == newId) {
			addMessage('Você está usando a mesma categoria que deseja apagar', 'error');
			return;
		}

		setCarregando(true);

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ id, newId }),
			});

			const { message } = await response.json();

			if (!response.ok) {
				addMessage(message, 'error');
			} else {
				addMessage('Categoria deletada com sucesso!', 'success');
				setCategorias((prev) => prev.filter((categoria) => categoria.id !== id));
				const categoriaNova = Categorias.find((categoria) => categoria.id === newId);
				const categoriaDeletada = Categorias.find((categoria) => categoria.id === id);

				setProdutosData((prev) =>
					prev.map((product) =>
						product.categoria.nome === categoriaDeletada!.nome
							? { ...product, categoria: { nome: categoriaNova!.nome } }
							: product
					)
				);
				form.reset();
			}
		} catch (err) {
			addMessage('Erro interno no servidor: ' + err, 'error');
		}
		setCarregando(false);
	};

	const handleProdutoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const nome = String(formData.get('nome'));
		const preco = String(formData.get('preco'));
		const categoria = String(formData.get('categoria'));
		const imagem = formData.get('imagem') as File;

		if (!nome || !preco || !categoria || !imagem) {
			addMessage('Um campo não foi fornecido', 'error');
			return;
		}
		setCarregando(true);

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produto`, {
				method: 'POST',
				credentials: 'include',
				body: formData,
			});

			const { message, data } = await response.json();
			setCarregando(false);
			if (!response.ok) {
				addMessage(message, 'error');
			} else {
				addMessage('Produto salvo com sucesso!', 'success');
				setProdutosData((prevItems) => [...prevItems, data]);
				setFile(null);
				form.reset();
			}
		} catch (err) {
			addMessage('Erro interno no servidor: ' + err, 'error');
		}
	};

	const handleProdutoUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);

		if (file) {
			formData.append('imagem', file);
		}

		setCarregando(true);

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produto`, {
				method: 'PATCH',
				credentials: 'include',
				body: formData,
			});

			const { message, data } = await response.json();
			setCarregando(false);

			if (!response.ok) {
				addMessage(message, 'error');
			} else {
				addMessage('Produto atualizado com sucesso!', 'success');
				setProdutosData((prev) => prev.map((product) => (product.id === data.id ? { ...data } : product)));
				setEditandoProduto(data);
				setFile(null);
				form.reset();
			}
		} catch (err) {
			addMessage('Erro interno no servidor: ' + err, 'error');
		}
	};

	const handleProdutoDelete = async (produtoId: string) => {
		setCarregando(true);
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produto/${produtoId}`, {
				method: 'DELETE',
				credentials: 'include',
			});

			const { message } = await response.json();
			setCarregando(false);

			if (!response.ok) {
				addMessage(message, 'error');
			} else {
				addMessage('Produto deletado com sucesso!', 'success');
				setProdutosData((prev) => prev.filter((product) => product.id !== produtoId));
			}
		} catch (err) {
			addMessage('Erro interno no servidor: ' + err, 'error');
		}
	};

	return (
		<div>
			<div className="collapse collapse-arrow bg-primary text-primary-content border border-base-300 mb-8">
				<input type="checkbox" />
				<div className="collapse-title font-semibold">Adicionar categorias</div>
				<div className="collapse-content grid grid-cols-1 gap-4 mx-1">
					<form
						onSubmit={handleCategoriaSubmit}
						className="flex flex-col md:flex-row gap-4 text-black">
						<label className="input w-full md:w-1/2">
							<span className="label">Nome da categoria</span>
							<input
								name="categoria"
								type="text"
							/>
						</label>

						{Carregando ? (
							<button
								type="submit"
								disabled
								className="btn btn-success">
								<span className="loading loading-spinner loading-lg"></span>
							</button>
						) : (
							<button
								type="submit"
								className="btn btn-success">
								<FaSave /> Salvar
							</button>
						)}
					</form>

					<span className="text-xs">Dica: clique no nome da categoria para altera-la</span>
					<div className="flex flex-row flex-wrap gap-4">
						{Categorias.map((value) => (
							<p
								className="badge badge-warning cursor-pointer"
								key={value.nome}
								onClick={() => {
									setEditandoCategoria(value);
									(document.getElementById('modal_editCategoria')! as HTMLDialogElement).showModal();
								}}>
								{value.nome}
							</p>
						))}
					</div>
				</div>
			</div>
			<div className="collapse collapse-arrow bg-primary text-primary-content border border-base-300 mb-8">
				<input type="checkbox" />
				<div className="collapse-title font-semibold">Adicionar produto</div>
				<form
					onSubmit={handleProdutoSubmit}
					encType="multipart/form-data"
					className="collapse-content flex flex-col md:flex-row gap-4 mx-2">
					<label
						htmlFor="fileUpload"
						className="btn btn-outline">
						<FaUpload />
						{file ? file.name : 'Escolha um arquivo'}
						<input
							name="imagem"
							id="fileUpload"
							type="file"
							className="hidden"
							onChange={handleFileChange}
						/>
					</label>

					<label className="floating-label flex-grow-1 text-black">
						<span>Nome do produto</span>
						<input
							name="nome"
							type="text"
							className="input w-full"
						/>
					</label>

					<label className="floating-label flex-grow-1 text-black">
						<span>Preço</span>
						<input
							name="preco"
							type="number"
							className="input w-full"
						/>
					</label>

					<label className="floating-label flex-grow-1 text-black">
						<span>Categoria</span>
						<select
							name="categoriaId"
							defaultValue="Selecione tags"
							className="select">
							<option disabled>Selecione categoria</option>
							{Categorias.map((value) => (
								<option
									value={value.id}
									key={value.nome}>
									{value.nome}
								</option>
							))}
						</select>
					</label>

					{Carregando ? (
						<button
							type="submit"
							disabled
							className="btn btn-success">
							<span className="loading loading-spinner loading-lg"></span>
						</button>
					) : (
						<button
							type="submit"
							className="btn btn-success">
							<FaSave /> Salvar
						</button>
					)}
				</form>
			</div>
			<Tabela
				fucDeleteProduto={handleProdutoDelete}
				fucEditProduto={setEditandoProduto}
			/>
			<Popup
				messages={messages}
				setMessages={setMessages}
			/>
			<dialog
				id={'modal_edit'}
				className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg text-center">Editando um produto</h3>
					{EditandoProduto && (
						<div className="py-4">
							<form
								onSubmit={handleProdutoUpdate}
								encType="multipart/form-data"
								className="flex flex-col gap-4 mx-2">
								<input
									name="produtoId"
									value={EditandoProduto.id}
									className="hidden"
									readOnly
								/>
								<label
									htmlFor="fileUpload"
									className="btn btn-outline">
									<FaUpload />
									{file ? file.name : 'Deixe em branco para não alterar a foto'}
									<input
										name="imagem"
										id="fileUpload"
										type="file"
										className="hidden"
										onChange={handleFileChange}
									/>
								</label>

								<label className="floating-label flex-grow-1">
									<span>Nome do produto</span>
									<input
										name="nome"
										defaultValue={EditandoProduto.nome}
										type="text"
										className="input w-full"
									/>
								</label>

								<label className="floating-label flex-grow-1">
									<span>Preço</span>
									<input
										name="preco"
										defaultValue={EditandoProduto.preco}
										type="number"
										className="input w-full"
									/>
								</label>

								<label className="floating-label flex-grow-1">
									<span>Categoria</span>
									<select
										name="categoriaId"
										defaultValue={EditandoProduto.categoria.nome}
										className="select w-full">
										<option disabled>Selecione categoria</option>
										{Categorias.map((value) => (
											<option
												value={value.id}
												key={value.nome}>
												{value.nome}
											</option>
										))}
									</select>
								</label>

								{Carregando ? (
									<button
										type="submit"
										disabled
										className="btn btn-success">
										<span className="loading loading-spinner loading-lg"></span>
									</button>
								) : (
									<button
										type="submit"
										className="btn btn-success">
										<FaSave /> Salvar
									</button>
								)}
							</form>
						</div>
					)}
					<div className="modal-action">
						<form method="dialog">
							<button className="btn btn-accent">Fechar</button>
						</form>
					</div>
				</div>
			</dialog>
			<dialog
				id={'modal_editCategoria'}
				className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg text-center">Editando uma categoria</h3>
					{EditandoCategoria && (
						<div className="py-4">
							<form
								onSubmit={handleCategoriaUpdate}
								className="flex flex-col gap-4 mx-2">
								<input
									name="categoriaId"
									value={EditandoCategoria.id}
									className="hidden"
									readOnly
								/>

								<label className="floating-label flex-grow-1">
									<span>Nome da categoria</span>
									<input
										name="nome"
										defaultValue={EditandoCategoria.nome}
										type="text"
										className="input w-full"
									/>
								</label>

								{Carregando ? (
									<button
										type="submit"
										disabled
										className="btn btn-success">
										<span className="loading loading-spinner loading-lg"></span>
									</button>
								) : (
									<button
										type="submit"
										className="btn btn-success">
										<FaSave /> Salvar
									</button>
								)}
							</form>
							<form
								onSubmit={handleCategoriaDelete}
								className="flex flex-col gap-4 mx-2 mt-3">
								<p>Escolha outra categoria para mover os produtos antes de excluir esta</p>
								<input
									name="categoriaId"
									value={EditandoCategoria.id}
									className="hidden"
									readOnly
								/>
								<label className="floating-label flex-grow-1">
									<span>Categoria</span>
									<select
										name="newId"
										defaultValue={EditandoCategoria.nome}
										className="select w-full">
										<option disabled>Selecione categoria</option>
										{Categorias.map((value) => (
											<option
												value={value.id}
												key={value.nome}>
												{value.nome}
											</option>
										))}
									</select>
								</label>

								{Carregando ? (
									<button
										type="button"
										disabled
										className="btn btn-error">
										<span className="loading loading-spinner loading-lg"></span>
									</button>
								) : (
									<button
										type="submit"
										className="btn btn-error">
										<FaTrash /> Excluir
									</button>
								)}
							</form>
						</div>
					)}
					<div className="modal-action">
						<form method="dialog">
							<button className="btn btn-accent">Fechar</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
}
