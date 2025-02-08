import Link from 'next/link';
import type { ReactNode } from 'react';
import { FaBars } from 'react-icons/fa';
import ThemeSwitcher from '../common/themeSwitcher';

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
					<div className="lg:hidden absolute">
						<label
							htmlFor="my-drawer-3"
							aria-label="open sidebar"
							className="btn btn-square btn-ghost">
							<FaBars size={20} />
						</label>
					</div>
					<Link
						href={'/'}
						className="mx-2 flex-1 px-2 text-xl font-bold text-center lg:text-left items-center">
						ConectaQR
					</Link>
					<div className="hidden flex-none lg:block">
						<ul className="menu menu-horizontal">
							<li>
								<ThemeSwitcher />
							</li>
							<div className="divider divider-horizontal"></div>
							<li>
								<Link
									className="btn btn-primary btn-ghost "
									href="/empresas">
									Empresas parceiras
								</Link>
							</li>
							<div className="divider divider-horizontal"></div>

							<li>
								<Link
									className="btn btn-primary btn-ghost "
									href="/acesso">
									Painel da empresa
								</Link>
							</li>
							<div className="divider divider-horizontal"></div>
							<li>
								<Link
									className="btn btn-primary btn-ghost "
									href="/feedback">
									Feedback
								</Link>
							</li>
							<div className="divider divider-horizontal"></div>
							<li>
								<Link
									className="btn btn-primary btn-ghost"
									href="/termos">
									Termos de uso
								</Link>
							</li>
						</ul>
					</div>
				</div>
				{children}
			</div>
			{/* Navbar mobile */}
			<div className="drawer-side z-50">
				<label
					htmlFor="my-drawer-3"
					aria-label="close sidebar"
					className="drawer-overlay"></label>
				<ul className="menu bg-base-200 min-h-full w-60 p-4 z-50">
					<li className="text-lg font-bold text-center my-4">Links do site</li>
					<li>
						<Link
							className="btn btn-primary  my-3"
							href="/empresas">
							Empresas parceiras
						</Link>
					</li>
					<li>
						<Link
							className="btn btn-primary "
							href="/acesso">
							Painel da empresa
						</Link>
					</li>
					<li>
						<Link
							className="btn btn-primary  my-3"
							href="/feedback">
							Feedback
						</Link>
					</li>
					<li>
						<Link
							className="btn btn-primary "
							href="/termos">
							Termos de uso
						</Link>
					</li>
					<li>
						<ThemeSwitcher className="btn-outline mt-3" />
					</li>
				</ul>
			</div>
		</div>
	);
}
