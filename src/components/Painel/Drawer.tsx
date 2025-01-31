import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { FaBars } from 'react-icons/fa';

type DrawerProps = {
	children: ReactNode;
	setTab: Dispatch<SetStateAction<string>>;
};

export default function Drawer({ children, setTab }: DrawerProps) {
	return (
		<div className="drawer">
			<input
				id="my-drawer-3"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content flex flex-col">
				<div className="navbar bg-base-300 w-full relative">
					<div className="flex-none lg:hidden absolute left-5">
						<label
							htmlFor="my-drawer-3"
							aria-label="open sidebar"
							className="btn btn-square btn-ghost">
							<FaBars size={20} />
						</label>
					</div>
					<div className="mx-2 flex-1 px-2 text-center md:text-left font-semibold">ConnectQR</div>
					<div className="hidden flex-none lg:block">
						<ul className="menu menu-horizontal">
							<li>
								<button
									className="btn btn-ghost btn-outline mx-2"
									onClick={() => setTab('Inicio')}>
									Visão geral
								</button>
							</li>
							<li>
								<button
									className="btn btn-ghost btn-outline"
									onClick={() => setTab('Editar')}>
									Editar perfil
								</button>
							</li>
							<li>
								<button
									className="btn btn-ghost btn-outline mx-2"
									onClick={() => setTab('Produtos')}>
									Gerenciar Produtos
								</button>
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
							className="btn btn-ghost btn-outline mb-2"
							onClick={() => setTab('Inicio')}>
							Visão geral
						</button>
					</li>
					<li>
						<button
							className="btn btn-ghost btn-outline mb-2"
							onClick={() => setTab('Editar')}>
							Editar perfil
						</button>
					</li>
					<li>
						<button
							className="btn btn-ghost btn-outline mb-2"
							onClick={() => setTab('Produtos')}>
							Gerenciar Produtos
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}
