import Image from 'next/image';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { FaEdit, FaSave, FaTrash, FaUpload } from 'react-icons/fa';
import type { Produtos, Categorias } from '@/types/types';

type Props = {
	Produtos: Produtos[];
	Categorias: Categorias[];
	setProdutos: Dispatch<SetStateAction<Produtos[]>>;
	setCategorias: Dispatch<SetStateAction<Categorias[]>>;
};

export default function Produtos({ Produtos, setProdutos, Categorias, setCategorias }: Props) {
	const [CategoriaError, SetCategoriaError] = useState('');
	const [ProdutoError, SetProdutoError] = useState('');
	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0] || null;
		setFile(selectedFile);
	};

	const handleCategoriaSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		SetCategoriaError('');
		const formData = new FormData(event.currentTarget);
		const nome = String(formData.get('categoria'));

		if (nome.length === 0) {
			SetCategoriaError('Nenhum nome foi fornecido');
			return;
		}

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
			if (!response.ok) {
				SetCategoriaError(message);
			} else {
				setCategorias((prevItems) => [...prevItems, data]);
				event.currentTarget.reset();
			}
		} catch {
			SetCategoriaError('Erro interno no servidor');
		}
	};

	const handleProdutoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		SetProdutoError('');
		const form = event.currentTarget;
		const formData = new FormData(form);
		const nome = String(formData.get('nome'));
		const preco = String(formData.get('preco'));
		const categoria = String(formData.get('categoria'));
		const imagem = formData.get('imagem') as File;

		if (!nome || !preco || !categoria || !imagem) {
			SetProdutoError('Um campo não foi fornecido');
			return;
		}

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produto`, {
				method: 'POST',
				credentials: 'include',
				body: formData,
			});

			const { message, data } = await response.json();
			if (!response.ok) {
				SetProdutoError(message);
			} else {
				setProdutos((prevItems) => [...prevItems, data]);
				form.reset();
			}
		} catch (err) {
			SetProdutoError('Erro interno no servidor' + err);
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

						<button
							type="submit"
							className="btn btn-success">
							<FaSave /> Salvar
						</button>
						{CategoriaError ? <span className="text-error text-base">{CategoriaError}</span> : ''}
					</form>

					<div className="flex flex-row flex-wrap gap-4">
						{Categorias.map((value) => (
							<p
								className="badge badge-warning"
								key={value.nome}>
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
						{file ? file.name : 'Escolha um arquivo'}{' '}
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

					<button
						type="submit"
						className="btn btn-success">
						<FaSave /> Salvar
					</button>
				</form>
				{ProdutoError ? <span>{ProdutoError}</span> : <></>}
			</div>
			<div className="overflow-x-auto w-full">
				<table className="table table-zebra min-w-max">
					<thead>
						<tr>
							<th>Imagem</th>
							<th>Nome</th>
							<th>Preco</th>
							<th>Categoria</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{Produtos.map((value, index) => (
							<tr key={index}>
								<td className="avatar flex items-center">
									<div className="mask h-12 w-20">
										<Image
											width={300}
											height={300}
											src={value.imagemUrl}
											alt={`Imagem do produto ${value.nome}`}
										/>
									</div>
								</td>
								<td>{value.nome}</td>
								<td>R$ {value.preco}</td>
								<td>{value.categoria.nome}</td>
								<td>
									<div className="flex flex-row">
										<button className="btn btn-ghost btn-error mr-2">
											<FaTrash size={18} />
										</button>
										<button className="btn btn-ghost btn-info">
											<FaEdit size={18} />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
