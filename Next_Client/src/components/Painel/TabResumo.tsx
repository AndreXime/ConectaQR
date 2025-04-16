import {
	FaStore,
	FaMapMarkerAlt,
	FaCheckCircle,
	FaTimesCircle,
	FaPhone,
	FaEnvelope,
	FaInstagram,
	FaBox,
	FaTag,
	FaPalette,
} from 'react-icons/fa';
import { useEmpresa } from './Context';
import { TbFileDescription } from 'react-icons/tb';

export default function Resumo() {
	const { Empresa, ProdutoECategoriaQTD } = useEmpresa();

	return (
		<div className="space-y-6 py-6 px-1 md:p-6">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">Visão Geral</h2>
				<p className="text-gray-500">Visualize e gerencie as informações da sua empresa.</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 ">
				{/* Card - Informações Básicas */}
				<div className="card bg-base-100 shadow-md">
					<div className="card-body">
						<h2 className="card-title text-lg font-medium pb-2">Informações Básicas</h2>
						<div className="space-y-4">
							<div className="flex items-start">
								<FaStore className="h-5 w-5 flex-shrink-0 mr-2 text-purple-600 mt-0.5" />
								<div>
									<p className="font-medium">Nome da Empresa</p>
									<p className="text-sm text-gray-500">{Empresa.nome}</p>
								</div>
							</div>
							<div className="flex items-start">
								<FaMapMarkerAlt className="h-5 w-5 flex-shrink-0 mr-2 text-purple-600 mt-0.5" />
								<div>
									<p className="font-medium">Localização</p>
									<p className="text-sm text-gray-500">{Empresa.cidade}</p>
									<p className="text-sm text-gray-500">{Empresa.cidade}</p>
									<div className="mt-1 flex items-center">
										<span className={`badge text-xs ${Empresa.maps ? 'badge-success' : 'badge-error'}`}>
											{Empresa.maps ? (
												<span className="flex items-center">
													<FaCheckCircle className="h-3 w-3 mr-1" /> Google Maps Ativo
												</span>
											) : (
												<span className="flex items-center">
													<FaTimesCircle className="h-3 w-3 mr-1" /> Google Maps Inativo
												</span>
											)}
										</span>
									</div>
								</div>
							</div>
							<div className="flex items-start">
								<TbFileDescription className="h-5 w-5 flex-shrink-0 mr-2 text-purple-600 mt-0.5" />
								<div>
									<p className="font-medium">Descrição da Empresa</p>
									<p className="text-sm text-gray-500 whitespace-pre-line">{Empresa.descricao}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Card - Contato */}
				<div className="card bg-base-100 shadow-md">
					<div className="card-body">
						<h2 className="card-title text-lg font-medium pb-2">Contato</h2>
						<div className="space-y-4">
							<div className="flex items-start">
								<FaPhone className="h-5 w-5 mr-2 text-purple-600 mt-0.5" />
								<div>
									<p className="font-medium">Telefone / WhatsApp</p>
									<p className="text-sm text-gray-500">{Empresa.telefone}</p>
								</div>
							</div>
							<div className="flex items-start">
								<FaEnvelope className="h-5 w-5 mr-2 text-purple-600 mt-0.5" />
								<div>
									<p className="font-medium">Email de Contato (Público)</p>
									<p className="text-sm text-gray-500">{Empresa.emailContato}</p>
								</div>
							</div>
							<div className="flex items-start">
								<FaInstagram className="h-5 w-5 mr-2 text-purple-600 mt-0.5" />
								<div>
									<p className="font-medium">Instagram</p>
									<p className="text-sm text-gray-500">{Empresa.instagram}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Card - Catalogo */}
				<div className="card bg-base-100 shadow-md">
					<div className="card-body">
						<h2 className="card-title text-lg font-medium pb-2">Catálogo</h2>
						<div className="space-y-4">
							<div className="flex items-start">
								<FaBox className="h-5 w-5 mr-2 text-purple-600 mt-0.5" />
								<div>
									<p className="font-medium">Total de Produtos</p>
									<p className="text-sm text-gray-500">{ProdutoECategoriaQTD.Pqtd} produtos cadastrados</p>
								</div>
							</div>
							<div className="flex items-start">
								<FaTag className="h-5 w-5 mr-2 text-purple-600 mt-0.5" />
								<div>
									<p className="font-medium">Total de Categorias</p>
									<p className="text-sm text-gray-500">{ProdutoECategoriaQTD.Cqtd} categorias cadastradas</p>
								</div>
							</div>
							<div className="flex items-start">
								<FaPalette className="h-5 w-5 mr-2 text-purple-600 mt-0.5" />
								<div>
									<p className="font-medium">Tema da Loja</p>
									<p className="text-sm text-gray-500">{Empresa.tema}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Card - Informações da Conta */}
				<div className="card bg-base-100 shadow-md">
					<div className="card-body">
						<h2 className="card-title text-lg font-medium pb-2">Informações da Conta</h2>
						<div className="space-y-4">
							<div>
								<p className="font-medium">Data de Criação</p>
								<p className="text-sm text-gray-500">
									{new Date(Empresa.createdAt).toLocaleString('pt-BR', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
										second: '2-digit',
									})}
								</p>
							</div>
							<div>
								<p className="font-medium">Última Atualização</p>
								<p className="text-sm text-gray-500">
									{new Date(Empresa.updatedAt).toLocaleString('pt-BR', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
										second: '2-digit',
									})}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
