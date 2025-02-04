import Link from 'next/link';
import type { ReactNode } from 'react';
import { FaBars } from 'react-icons/fa';
interface props {
	children: ReactNode;
	absolute?: boolean;
}
export default function Navbar({ children, absolute }: props) {
	return (
		<div className="drawer">
			<input
				id="my-drawer-3"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content flex flex-col">
				{/* Navbar */}
				<div className={`navbar bg-base-100 w-full ${absolute && 'absolute'}`}>
					<div className="flex-none lg:hidden absolute">
						<label
							htmlFor="my-drawer-3"
							aria-label="open sidebar"
							className="btn btn-square btn-ghost">
							<FaBars size={20} />
						</label>
					</div>
					<div className="mx-2 flex-1 px-2 text-xl font-bold text-center lg:text-left">ConectaQR</div>
					<div className="hidden flex-none lg:block">
						<ul className="menu menu-horizontal">
							<div className="divider divider-horizontal"></div>
							<li>
								<Link
									className="btn btn-primary btn-ghost "
									href="/">
									Empresas parceiras
								</Link>
							</li>
							<div className="divider divider-horizontal"></div>

							<li>
								<Link
									className="btn btn-primary btn-ghost "
									href="/">
									Área da empresa
								</Link>
							</li>
							<div className="divider divider-horizontal"></div>
							<li>
								<Link
									className="btn btn-primary btn-ghost "
									href="/">
									Feedback
								</Link>
							</li>
							<div className="divider divider-horizontal"></div>
							<li>
								<Link
									className="btn btn-primary btn-ghost"
									href="/">
									Termos de uso
								</Link>
							</li>
						</ul>
					</div>
				</div>
				{children}
			</div>
			{/* Navbar mobile */}
			<div className="drawer-side">
				<label
					htmlFor="my-drawer-3"
					aria-label="close sidebar"
					className="drawer-overlay"></label>
				<ul className="menu bg-base-200 min-h-full w-60 p-4">
					<li className="text-lg font-bold text-center my-4">Links do site</li>
					<li>
						<Link
							className="btn btn-primary btn-soft my-3"
							href="/">
							Empresas parceiras
						</Link>
					</li>
					<li>
						<Link
							className="btn btn-primary btn-soft"
							href="/">
							Área da empresa
						</Link>
					</li>
					<li>
						<Link
							className="btn btn-primary btn-soft my-3"
							href="/">
							Feedback
						</Link>
					</li>
					<li>
						<Link
							className="btn btn-primary btn-soft"
							href="/">
							Termos de uso
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
