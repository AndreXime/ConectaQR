import Link from 'next/link';
import type { ReactNode } from 'react';
import { FaArrowRight, FaBars } from 'react-icons/fa';
import ThemeSwitcher from '../common/themeSwitcher';

interface props {
	children: ReactNode;
	absolute?: boolean;
}
export default function Navbar({ children, absolute }: props) {
	return (
		<div className="drawer">
			<input
				id="drawer"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content flex flex-col">
				<nav className={`navbar bg-base-100 w-full ${absolute && 'absolute'}`}>
					<div className="lg:hidden absolute">
						<label
							htmlFor="drawer"
							aria-label="open sidebar"
							className="btn btn-square btn-ghost">
							<FaBars size={20} />
						</label>
					</div>
					<Link
						href="/"
						className=" flex-1 px-2 text-xl font-bold text-center lg:text-left items-center">
						ConectaQR
					</Link>
					<div className="hidden flex-none lg:block">
						<ul className="menu menu-horizontal ">
							<li className=" px-1">
								<ThemeSwitcher />
							</li>
							<li className=" px-1">
								<Link
									className="btn btn-primary btn-ghost "
									href="/empresas">
									Empresas parceiras
								</Link>
							</li>

							<li className=" px-1">
								<Link
									className="btn btn-primary btn-ghost "
									href="/acesso">
									Painel da empresa
								</Link>
							</li>
							<li className=" px-1">
								<Link
									className="btn btn-primary btn-ghost "
									href="/termos-e-suporte">
									Termos e Suporte
								</Link>
							</li>
							<li className="px-1">
								<Link
									className="btn btn-primary btn-ghost"
									href="/sobre-nos">
									Sobre a plataforma
								</Link>
							</li>
						</ul>
					</div>
				</nav>
				{children}
			</div>
			{/* Navbar mobile */}
			<div className="drawer-side">
				<label
					htmlFor="drawer"
					aria-label="close sidebar"
					className="drawer-overlay"></label>
				<ul className="menu bg-base-200 min-h-full w-60">
					<li className="text-lg font-bold text-center mt-4 mb-7">Navegação do site</li>
					<li>
						<Link
							className="btn btn-primary mb-3 flex justify-between"
							href="/empresas">
							Empresas parceiras <FaArrowRight />
						</Link>
					</li>
					<li>
						<Link
							className="btn btn-primary mb-3 flex justify-between"
							href="/acesso">
							Painel da empresa <FaArrowRight />
						</Link>
					</li>
					<li>
						<Link
							className="btn btn-primary mb-3 flex justify-between"
							href="/termos-e-suporte">
							Termos e Suporte <FaArrowRight />
						</Link>
					</li>
					<li>
						<Link
							className="btn btn-primary mb-3 flex justify-between"
							href="/sobre-nos">
							Sobre a plataforma <FaArrowRight />
						</Link>
					</li>
					<li>
						<ThemeSwitcher
							text
							className="btn-outline flex justify-between"
						/>
					</li>
				</ul>
			</div>
		</div>
	);
}
