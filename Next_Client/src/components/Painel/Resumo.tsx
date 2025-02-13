import type { EmpresaCompleta } from '@/types/types';

type Props = {
	Data: EmpresaCompleta;
	qtdCategorias: number;
	qtdProdutos: number;
};

export default function Resumo({ Data, qtdCategorias, qtdProdutos }: Props) {
	return (
		<section className="flex flex-col gap-5">
			<h2 className="text-2xl text-center font-semibold mb-2"> Visão geral da sua loja </h2>
			<div className="stats shadow stats-vertical md:stats-horizontal bg-base-200 grid grid-cols-1 lg:grid-cols-3">
				<div className="stat place-items-center w-full">
					<div className="stat-title">Nome publico</div>
					<div className="stat-value capitalize">{Data.nome.split('-').join(' ')}</div>
				</div>

				<div className="stat place-items-center">
					<div className="stat-title">Google maps</div>
					<div className="stat-value">{Data.maps ? 'Presente' : 'Desabilitado'}</div>
				</div>
				<div className="stat place-items-center">
					<div className="stat-title">Tema da loja</div>
					<div className="stat-value capitalize text-primary">{Data.tema}</div>
				</div>
			</div>

			<div className="stats shadow stats-vertical md:stats-horizontal bg-base-200">
				<div className="stat place-items-center w-full">
					<div className="stat-title">Descrição que aparece na sua pagina</div>
					<div className="stat-value text-base whitespace-normal line-clamp-3 text-ellipsis">{Data.descricao}</div>
				</div>

				<div className="stat place-items-center w-full">
					<div className="stat-title">Conteúdo da sua página para os buscadores como o google.</div>
					<div className="stat-value text-base whitespace-normal line-clamp-3 text-ellipsis">{Data.descricaoCurta}</div>
				</div>
			</div>

			<div className="stats shadow stats-vertical md:stats-horizontal bg-base-200">
				<div className="stat place-items-center">
					<div className="stat-title">Quantidade de produtos registrados</div>
					<div className="stat-value">{qtdProdutos}</div>
				</div>

				<div className="stat place-items-center">
					<div className="stat-title">Categorias registradas registradas</div>
					<div className="stat-value">{qtdCategorias}</div>
				</div>
			</div>
			<div className="stats shadow stats-vertical md:stats-horizontal bg-base-200">
				<div className="stat place-items-center">
					<div className="stat-title">Telefone de contato para clientes</div>
					<div className="stat-value text-base whitespace-normal">{Data.telefone}</div>
				</div>
				<div className="stat place-items-center">
					<div className="stat-title">Email de contato para clientes</div>
					<div className="stat-value text-base whitespace-normal">{Data.emailContato}</div>
				</div>
				<div className="stat place-items-center">
					<div className="stat-title">Instagram comercial</div>
					<div className="stat-value text-base whitespace-normal">{Data.instagram}</div>
				</div>
			</div>
		</section>
	);
}
