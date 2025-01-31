import Link from 'next/link';
import { FaBars } from 'react-icons/fa';

export default function Navbar() {
	return (
		<nav className="w-full flex justify-center bg-base-100 absolute">
			<div className="navbar py-2 bg-base-100 max-w-6xl">
				<div className="md:navbar-start w-full flex items-center justify-between ">
					<div className="lg:hidden dropdown dropdown-bottom">
						<label
							tabIndex={0}
							role="button"
							aria-label="Abrir menu movel"
							className="btn btn-ghost btn-circle">
							<FaBars size={19} />
						</label>
						<ul
							tabIndex={0}
							className="menu dropdown-content rounded-box bg-base-100 z-[20] w-52 mt-3">
							<li>
								<Link
									className="btn btn-accent btn-ghost btn-outline mb-2"
									href="/">
									Planos
								</Link>
							</li>
							<li>
								<Link
									className="btn btn-accent btn-ghost btn-outline"
									href="/">
									Contato
								</Link>
							</li>
							<li>
								<Link
									className="btn btn-accent btn-ghost btn-outline my-2"
									href="/">
									Empresas
								</Link>
							</li>
							<li>
								<Link
									className="btn btn-accent btn-ghost btn-outline"
									href="/">
									Área da empresa
								</Link>
							</li>
						</ul>
					</div>

					<div className="md:flex-1 lg:block">
						<Link href="/">
							{/*<span className="font-bold text-xl">
								<Image
									width={300}
									height={300}
									className="mask hidden md:inline-block mr-3 mask-circle w-12"
									src="/logo.jpeg"
									alt="Logo"
								/>
							</span>*/}
							<span className="font-bold text-xl">ConectaQR</span>
						</Link>
					</div>
					<button className="lg:hidden btn btn-primary">Acessar</button>
				</div>

				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal custom-menu">
						<li className="mr-2">
							<Link
								className="btn btn-ghost"
								href="/pricing">
								Planos
							</Link>
						</li>
						<li className="mr-2">
							<Link
								className="btn btn-ghost"
								href="/contact-us">
								Contato
							</Link>
						</li>
						<li className="mr-2">
							<Link
								className="btn btn-ghost"
								href="/pricing">
								Empresas
							</Link>
						</li>
					</ul>
				</div>
				<div className="navbar-end hidden lg:flex">
					<Link href="/start-designing">
						<button className="btn btn-secondary text-xs mr-4">Fazer login</button>
					</Link>
					<Link href="/start-designing">
						<button className="btn btn-primary text-xs">Se cadastrar</button>
					</Link>
				</div>
			</div>
		</nav>
	);
}
