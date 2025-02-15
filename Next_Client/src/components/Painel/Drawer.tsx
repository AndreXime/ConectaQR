import Link from 'next/link';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { FaBars } from 'react-icons/fa';

type DrawerProps = {
	nomeEmpresa: string;
	children: ReactNode;
	setTab: Dispatch<SetStateAction<string>>;
};

export default function Drawer({ children, setTab, nomeEmpresa }: DrawerProps) {
	return (
		<div className="drawer">
			<input
				id="my-drawer-3"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content flex flex-col">
				<div className="navbar bg-primary text-base-content w-full relative">
					<div className="flex-none md:hidden absolute left-5">
						<label
							htmlFor="my-drawer-3"
							aria-label="open sidebar"
							className="btn btn-square btn-ghost">
							<FaBars size={20} />
						</label>
					</div>
					<div className="mx-2 flex-1 px-2 text-primary-content text-center md:text-left text-xl font-semibold">
						ConnectQR
					</div>
					<div className="hidden flex-none md:block">
						<ul className="menu menu-horizontal">
							<li>
								<button
									className="btn btn-accent mx-2"
									onClick={() => setTab('Inicio')}>
									Visão geral
								</button>
							</li>
							<li>
								<button
									className="btn btn-accent "
									onClick={() => setTab('Editar')}>
									Editar perfil
								</button>
							</li>
							<li>
								<button
									className="btn btn-accent  mx-2"
									onClick={() => setTab('Produtos')}>
									Gerenciar Produtos
								</button>
							</li>
							<li>
								<button
									className="btn btn-accent "
									onClick={() => setTab('QRCode')}>
									Gerar QRCode
								</button>
							</li>
							<li>
								<Link
									className="btn btn-accent  mx-2"
									href={'/' + nomeEmpresa}>
									Ver sua loja
								</Link>
							</li>
						</ul>
					</div>
				</div>
				{children}
			</div>
			<div className="drawer-side">
				<label
					htmlFor="my-drawer-3"
					aria-label="close sidebar"
					className="drawer-overlay"></label>
				<ul className="menu bg-base-200 min-h-full w-60 p-4">
					<h1 className="text-lg font-semibold text-center mb-3">Painel</h1>
					<li>
						<button
							className="btn btn-accent mb-2"
							onClick={() => setTab('Inicio')}>
							Visão geral
						</button>
					</li>
					<li>
						<button
							className="btn btn-accent mb-2"
							onClick={() => setTab('Editar')}>
							Editar perfil
						</button>
					</li>
					<li>
						<button
							className="btn btn-accent mb-2"
							onClick={() => setTab('Produtos')}>
							Gerenciar Produtos
						</button>
					</li>
					<li>
						<button
							className="btn btn-accent mb-2"
							onClick={() => setTab('QRCode')}>
							Gerar QRCode
						</button>
					</li>
					<li>
						<Link
							className="btn btn-accent"
							href={'/' + nomeEmpresa}>
							Ver sua loja
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
