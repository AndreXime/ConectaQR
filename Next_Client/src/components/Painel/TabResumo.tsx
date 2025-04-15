import { useEmpresa } from './Context';

export default function Resumo() {
	const { Empresa, ProdutoECategoriaQTD } = useEmpresa();

	return (
		<section className="flex flex-col gap-5">
			<h2 className="text-2xl text-center font-semibold my-2"> Visão geral da sua loja </h2>
			<div className="stats shadow stats-vertical md:stats-horizontal bg-base-100 grid grid-cols-1 lg:grid-cols-3">
				<div className="stat place-items-center w-full">
					<div className="stat-title">Nome publico</div>
					<div className="stat-value capitalize">{Empresa.nome.split('-').join(' ')}</div>
				</div>

				<div className="stat place-items-center">
					<div className="stat-title">Google maps</div>
					<div className={`stat-value ${Empresa.maps ? 'text-success' : 'text-error'}`}>
						{Empresa.maps ? 'Presente' : 'Desabilitado'}
					</div>
				</div>
				<div className="stat place-items-center">
					<div className="stat-title">Tema da loja</div>
					<div className="stat-value capitalize text-primary">{Empresa.tema}</div>
				</div>
			</div>

			<div className="stats shadow stats-vertical md:stats-horizontal bg-base-100">
				<div className="stat place-items-center w-full py-3">
					<div className="stat-title">Descrição que aparece na sua pagina</div>
					<div className="stat-value text-lg whitespace-normal line-clamp-3 text-ellipsis">{Empresa.descricao}</div>
				</div>
			</div>

			<div className="stats shadow stats-vertical md:stats-horizontal bg-base-100 grid grid-cols-1 lg:grid-cols-3">
				<div className="stat place-items-center">
					<div className="stat-title">Telefone de contato para clientes</div>
					<div className="stat-value text-lg whitespace-normal">{Empresa.telefone}</div>
				</div>
				<div className="stat place-items-center">
					<div className="stat-title">Email de contato para clientes</div>
					<div className="stat-value text-lg whitespace-normal">{Empresa.emailContato}</div>
				</div>
				<div className="stat place-items-center">
					<div className="stat-title">Instagram comercial</div>
					<div className="stat-value text-lg whitespace-normal">{Empresa.instagram}</div>
				</div>
			</div>

			<div className="stats shadow stats-vertical md:stats-horizontal bg-base-100 grid grid-cols-1 lg:grid-cols-2">
				<div className="stat place-items-center">
					<div className="stat-title">Quantidade de produtos registrados</div>
					<div className="stat-value">{ProdutoECategoriaQTD.Pqtd}</div>
				</div>

				<div className="stat place-items-center">
					<div className="stat-title">Categorias registradas registradas</div>
					<div className="stat-value">{ProdutoECategoriaQTD.Cqtd}</div>
				</div>
			</div>
		</section>
	);
}
