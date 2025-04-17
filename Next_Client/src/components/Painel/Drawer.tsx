import Link from 'next/link';
import { useEmpresa } from './Context';
import { BsBox, BsBuilding, BsPerson, BsQrCode } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { FaStore, FaX } from 'react-icons/fa6';

const navItems = [
	{ icon: BsBuilding, label: 'Inicio', Tab: 'Inicio' },
	{ icon: BsPerson, label: 'Editar perfil', Tab: 'Editar' },
	{ icon: BsBox, label: 'Gerenciar produtos', Tab: 'Produtos' },
	{ icon: BsQrCode, label: 'Gerar QRCode', Tab: 'QRCode' },
];
export default function Drawer() {
	const { setTab, EmpresaNome, mobile, setMobile } = useEmpresa();

	return (
		<>
			<div className="hidden lg:block w-56 p-4 bg-base-100 h-screen">
				<div className="flex items-center gap-2 p-4">
					<span className="font-bold text-xl text-center">ConectaQR</span>
				</div>
				<nav className="space-y-2">
					{navItems.map((item, index) => (
						<button
							key={index}
							onClick={() => {
								setTab(item.Tab);
							}}
							className={`w-full justify-start btn btn-ghost`}>
							<item.icon className="mr-2 h-4 w-4" />
							{item.label}
						</button>
					))}
					<Link
						href={'/' + EmpresaNome}
						className="w-full justify-start btn btn-ghost">
						<FaStore className="mr-2 h-4 w-4" />
						Ver Loja
					</Link>
					<button className="w-full btn btn-ghost justify-start">
						<BiLogOut className="mr-2 h-4 w-4" />
						Sair
					</button>
				</nav>
			</div>

			{/* Sidebar overlay para telas pequenas */}
			{mobile && (
				<div className="fixed inset-0 z-50 ">
					<div
						className="absolute top-0 right-0 w-[100%] md:w-[50%] h-full bg-white p-4"
						onClick={(e) => e.stopPropagation()}>
						<div className="flex justify-between items-center flex-row w-full mb-8">
							<span className="font-semibold text-lg ml-2">ConectaQR</span>
							<FaX
								size={18}
								onClick={() => setMobile(false)}
							/>
						</div>
						<nav className="space-y-2 flex flex-col h-full">
							{navItems.map((item, index) => (
								<button
									key={index}
									onClick={() => {
										setMobile(false);
										setTab(item.Tab);
									}}
									className={`w-full justify-start btn btn-ghost`}>
									<item.icon className="mr-2 h-4 w-4" />
									{item.label}
								</button>
							))}
							<Link
								href={'/' + EmpresaNome}
								className="w-full justify-start btn btn-ghost">
								<FaStore className="mr-2 h-4 w-4" />
								Ver Loja
							</Link>
							<button className="w-full justify-start btn btn-ghost">
								<BiLogOut className="mr-2 h-4 w-4" />
								Sair
							</button>
						</nav>
					</div>
				</div>
			)}
		</>
	);
}

/*
<div className="drawer">
			<input
				id="drawer"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content flex flex-col">
				<div className="navbar bg-primary text-base-content w-full relative">
					<div className="flex-none md:hidden absolute left-5">
						<label
							htmlFor="drawer"
							aria-label="open sidebar"
							className="btn btn-square btn-ghost">
							<FaBars size={20} />
						</label>
					</div>
					<div className="mx-2 flex-1 px-2 text-primary-content text-center md:text-left text-xl font-semibold">
						ConectaQR
					</div>
					<div className="hidden flex-none md:block">
						<ul className="menu menu-horizontal">
							{navItems.map((value) => (
								<li>
									<button
										key={value.Tab}
										className="btn mx-1"
										onClick={() => setTab(value.Tab)}>
										<value.icon />
										{value.label}
									</button>
								</li>
							))}
							<li>
								<Link
									className="btn  mx-2"
									href={'/' + EmpresaNome}>
									Ver sua loja
								</Link>
							</li>
						</ul>
					</div>
				</div>
				{children}
			</div>
			<div className="drawer-side z-20">
				<label
					htmlFor="drawer"
					aria-label="close sidebar"
					className="drawer-overlay"></label>
				<ul className="menu bg-base-200 min-h-full w-60 p-1">
					<h1 className="text-xl font-bold text-center my-5">Painel</h1>
					{navItems.map((value) => (
						<li>
							<button
								key={value.Tab}
								className="btn btn-accent mb-2 flex justify-between"
								onClick={() => setTab(value.Tab)}>
								{value.label}
								<value.icon />
							</button>
						</li>
					))}

					<li>
						<Link
							className="btn btn-accent flex justify-between"
							href={'/' + EmpresaNome}>
							Ver sua loja <FaArrowRight />
						</Link>
					</li>
				</ul>
			</div>
		</div>
*/
