import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import { FaEdit, FaSave, FaTrash, FaUpload } from 'react-icons/fa';

type ProdutoType = {
	nome: string;
	preco: string;
	categorias: string;
	imagem: string;
};

type Props = {
	Data: ProdutoType[];
	Categorias: string[];
	setData: Dispatch<SetStateAction<ProdutoType[]>>;
	setCategorias: Dispatch<SetStateAction<string[]>>;
};

export default function Produtos({ Data, setData, Categorias }: Props) {
	return (
		<div>
			<div className="collapse collapse-arrow bg-base-200 border border-base-300 mb-8">
				<input type="checkbox" />
				<div className="collapse-title font-semibold">Adicionar categorias</div>
				<div className="collapse-content grid grid-cols-1 gap-4 mx-1">
					<form className="flex flex-col md:flex-row gap-4">
						<label className="floating-label">
							<span>Categorias</span>
							<input
								name="categoria"
								type="text"
								className="input w-full"
							/>
						</label>

						<button className="btn btn-success">
							<FaSave /> Salvar
						</button>
					</form>

					<div className="flex flex-row flex-wrap gap-4">
						{Categorias.map((value) => (
							<p
								className="badge badge-warning"
								key={value}>
								{value}
							</p>
						))}
					</div>
				</div>
			</div>
			<div className="collapse collapse-arrow bg-base-200 border border-base-300 mb-8">
				<input type="checkbox" />
				<div className="collapse-title font-semibold">Adicionar produto</div>
				<div className="collapse-content flex flex-col md:flex-row gap-4 mx-2">
					<label
						htmlFor="fileUpload"
						className="btn btn-outline">
						<FaUpload /> Envie uma foto
						<input
							id="fileUpload"
							type="file"
							className="hidden"
						/>
					</label>

					<label className="floating-label flex-grow-1">
						<span>Nome do produto</span>
						<input
							type="text"
							className="input w-full"
						/>
					</label>

					<label className="floating-label flex-grow-1">
						<span>Preço</span>
						<input
							type="number"
							className="input w-full"
						/>
					</label>

					<label className="floating-label flex-grow-1">
						<span>Categoria</span>
						<select
							defaultValue="Selecione tags"
							className="select">
							<option disabled>Selecione categoria</option>
							{Categorias.map((value) => (
								<option key={value}>{value}</option>
							))}
						</select>
					</label>

					<button
						onClick={() => {
							setData((prevData) => ({ ...prevData, nome: 'Teste' }));
						}}
						className="btn btn-success">
						<FaSave /> Salvar
					</button>
				</div>
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
						{Data.map((value, index) => (
							<tr key={index}>
								<td className="avatar flex items-center">
									<div className="mask mask-squircle h-12 w-12">
										<Image
											width={300}
											height={300}
											src={value.imagem}
											alt={`Imagem do produto ${value.nome}`}
										/>
									</div>
								</td>
								<td>{value.nome}</td>
								<td>R$ {value.preco}</td>
								<td>{value.categorias}</td>
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
