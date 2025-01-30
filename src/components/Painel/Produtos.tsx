import type { Dispatch, SetStateAction } from 'react';

type DataType = {
	nome: string;
	preco: string;
	categorias: string;
};

type Props = {
	Data: DataType[];
	setData: Dispatch<SetStateAction<DataType[]>>;
};

export default function Produtos({ Data, setData }: Props) {
	return (
		<div>
			{Data.map((value) => (
				<>
					<span>{value.nome}</span>
					<span>{value.preco}</span>
					<span>{value.categorias}</span>
					<button onClick={() => setData([])}>Remover</button>
				</>
			))}
		</div>
	);
}
