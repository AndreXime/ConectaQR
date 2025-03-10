import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { FaSave, FaTrash, FaUpload } from 'react-icons/fa';
import type { Produto, Categoria } from '@/lib/types';
import { Tabela } from './index';

type Props = {
	Produtos: Produto[];
	Categorias: Categoria[];
	setProdutos: Dispatch<SetStateAction<Produto[]>>;
	setCategorias: Dispatch<SetStateAction<Categoria[]>>;
};

export default function Produtos({ Produtos, setProdutos, Categorias, setCategorias }: Props) {
	const [Popup, setPopup] = useState(['', '']);
	const [file, setFile] = useState<File | null>(null);
	const [EditandoProduto, setEditandoProduto] = useState<Produto>();
	const [EditandoCategoria, setEditandoCategoria] = useState<Categoria>();
	const [Carregando, setCarregando] = useState(false);

	useEffect(() => {
		if (Popup[0]) {
			const timer = setTimeout(() => {
				setPopup(['', '']);
			}, 10000);

			return () => clearTimeout(timer);
		}
	}, [Popup]);

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
			setPopup(['error', 'Nenhum nome foi fornecido']);
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
				setPopup(['error', message]);
			} else {
				setPopup(['success', 'Categoria salva com sucesso']);
				setCategorias((prevItems) => [...prevItems, data]);
				form.reset();
			}
		} catch (err) {
			setPopup(['error', 'Erro interno no servidor ' + err]);
		}
	};

	const handleCategoriaUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const nome = String(formData.get('nome'));
		const categoriaId = String(formData.get('categoriaId'));

		if (nome.length === 0 || !categoriaId) {
			setPopup(['error', 'Um campo não foi fornecido']);
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
				setPopup(['error', message]);
			} else {
				setPopup(['success', 'Categoria atualizado com sucesso!']);
				setCategorias((prev) => prev.map((categoria) => (categoria.id === data.id ? { ...data } : categoria)));
				setEditandoCategoria(data);
				form.reset();
			}
		} catch (err) {
			setPopup(['error', 'Erro interno no servidor ' + err]);
		}
	};

	const handleCategoriaDelete = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const id = String(formData.get('categoriaId'));
		const newId = String(formData.get('newId'));

		if (id == newId) {
			setPopup(['error', 'Voce está o usando a mesma categoria que deseja apagar']);
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
				setPopup(['error', message]);
			} else {
				setPopup(['success', 'Categoria deletada com sucesso!']);
				setCategorias((prev) => prev.filter((categoria) => categoria.id !== id));
				const categoriaNova = Categorias.find((categoria) => categoria.id === newId);
				const categoriaDeletada = Categorias.find((categoria) => categoria.id === id);

				setProdutos((prev) =>
					prev.map((product) =>
						product.categoria.nome === categoriaDeletada!.nome
							? { ...product, categoria: { nome: categoriaNova!.nome } }
							: product
					)
				);
				form.reset();
			}
		} catch (err) {
			setPopup(['error', 'Erro interno no servidor' + err]);
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
			setPopup(['error', 'Um campo não foi fornecido']);
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
				setPopup(['error', message]);
			} else {
				setPopup(['success', 'Produto salvo com sucesso!']);
				setProdutos((prevItems) => [...prevItems, data]);
				setFile(null);
				form.reset();
			}
		} catch (err) {
			setPopup(['error', 'Erro interno no servidor' + err]);
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
				setPopup(['error', message]);
			} else {
				setPopup(['success', 'Produto atualizado com sucesso!']);
				setProdutos((prev) => prev.map((product) => (product.id === data.id ? { ...data } : product)));
				setEditandoProduto(data);
				setFile(null);
				form.reset();
			}
		} catch (err) {
			setPopup(['error', 'Erro interno no servidor' + err]);
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
				setPopup(['error', message]);
			} else {
				setPopup(['success', 'Produto deletado com sucesso!']);
				setProdutos((prev) => prev.filter((product) => product.id !== produtoId));
			}
		} catch (err) {
			setPopup(['error', 'Erro interno no servidor' + err]);
		}
	};

	return (
		<div>
			<div className="collapse collapse-arrow bg-base-200 border border-base-300 mb-8">
				<input type="checkbox" />
				<div className="collapse-title font-semibold">Adicionar categorias</div>
				<div className="collapse-content grid grid-cols-1 gap-4 mx-1">
					<form
						onSubmit={handleCategoriaSubmit}
						className="flex flex-col md:flex-row gap-4">
						<label className="floating-label">
							<span>Categorias</span>
							<input
								name="categoria"
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
			<div className="collapse collapse-arrow bg-base-200 border border-base-300 mb-8">
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

					<label className="floating-label flex-grow-1">
						<span>Nome do produto</span>
						<input
							name="nome"
							type="text"
							className="input w-full"
						/>
					</label>

					<label className="floating-label flex-grow-1">
						<span>Preço</span>
						<input
							name="preco"
							type="number"
							className="input w-full"
						/>
					</label>

					<label className="floating-label flex-grow-1">
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
				data={Produtos}
				categorias={Categorias}
				fucDeleteProduto={handleProdutoDelete}
				fucEditProduto={setEditandoProduto}
			/>
			{Popup[0] && (
				<div className="toast toast-top toast-start">
					<div className={`alert ${Popup[0] === 'success' ? 'alert-success' : 'alert-error'}`}>
						<span>{Popup[1]}</span>
					</div>
				</div>
			)}
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
								<p>Selecione uma outra categoria para herdar os produtos dessa categoria ser deletada</p>
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
