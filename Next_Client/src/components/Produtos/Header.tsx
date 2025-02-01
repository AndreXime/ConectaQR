import type { ReactNode } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';

type HeaderProps = {
	EmpresaName: string;
	children: ReactNode;
	Categorias: string[];
};
export default function Header({ EmpresaName, children, Categorias }: HeaderProps) {
	return (
		<div className="drawer">
			<input
				id="my-drawer"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content flex flex-col">
				<nav className="navbar flex bg-base-300 w-full p-3 shadow relative justify-center">
					<label
						htmlFor="my-drawer"
						className="btn btn-square btn-ghost left-3 absolute md:hidden">
						<FaBars size={20} />
					</label>

					<h1 className="md:text-left text-center md:ml-4 text-2xl font-bold">{EmpresaName}</h1>

					<div className="hidden md:flex md:flex-1 md:justify-end">
						<label className="input input-bordered flex items-center gap-2 w-1/2">
							<input
								type="text"
								placeholder="Pesquisar produtos..."
							/>
							<FaSearch />
						</label>
					</div>
				</nav>
				<div className="md:hidden bg-base-300 w-full px-5">
					<label className="input input-bordered gap-2 w-full my-2">
						<input
							type="text"
							placeholder="Pesquisar produtos..."
						/>
						<FaSearch />
					</label>
				</div>
				<div className="hidden bg-base-200 flex-row md:flex items-center ">
					<h1 className="text-xl font-bold text-left my-4 ml-8 mr-3">Categorias</h1>
					<div className="justify-center gap-2">
						{Categorias.map((value) => (
							<button
								className="btn btn-ghost"
								key={value}>
								{value}
							</button>
						))}
					</div>
				</div>
				<div className="bg-base-100">{children}</div>
			</div>
			<div className="drawer-side">
				<label
					htmlFor="my-drawer"
					className="drawer-overlay"></label>
				<ul className="menu bg-base-200 min-h-full w-80 p-4">
					<h1 className="text-2xl font-bold text-center my-5">Categorias</h1>
					<div className="grid grid-cols-2 justify-center gap-2">
						{Categorias.map((value) => (
							<button
								className="btn btn-outline mb-2 col-span-1"
								key={value}>
								{value}
							</button>
						))}
					</div>
				</ul>
			</div>
		</div>
	);
}
