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
	setData: Dispatch<SetStateAction<ProdutoType[]>>;
};

export default function Produtos({ Data, setData }: Props) {
	return (
		<div>
			<div className="overflow-x-auto">
				<table className="table table-zebra">
					<thead>
						<tr>
							<th></th>
							<th>Imagem</th>
							<th>Nome</th>
							<th>Preco</th>
							<th>Categoria</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th></th>
							<td>
								<input
									id="fileUpload"
									type="file"
									className="hidden"
								/>
								<label
									htmlFor="fileUpload"
									className=" px-4 py-2 rounded-lg btn btn-outline">
									<FaUpload />
								</label>
							</td>
							<td>
								<input
									type="text"
									className="input"
								/>
							</td>
							<td>
								<input
									type="number"
									className="input"
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
								/>
							</td>
							<th>
								<button
									onClick={() => {
										setData((prevData) => ({ ...prevData, nome: 'Teste' }));
									}}
									className="btn btn-ghost btn-success">
									<FaSave size={18} />
								</button>
							</th>
						</tr>
						{Data.map((value, index) => (
							<tr key={index}>
								<th>{index}</th>
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
