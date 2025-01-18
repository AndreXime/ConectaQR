import Image from 'next/image';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';

export default function Navbar() {
	return (
		<nav className="w-full flex justify-center  bg-base-100 fixed z-20">
			<div className="navbar py-2 bg-base-100 max-w-6xl">
				<div className="md:navbar-start w-full">
					<div className="lg:hidden fixed left-0 dropdown dropdown-bottom">
						<label
							tabIndex={0}
							role="button"
							className="btn btn-square btn-ghost ">
							<FaBars size={19} />
						</label>
						<ul
							tabIndex={0}
							className="menu dropdown-content rounded-b-lg bg-base-100 z-[20] w-52 p-2">
							<li className="mr-2 border-b-2">
								<Link href="/pricing">Planos</Link>
							</li>
							<li className="mr-2">
								<Link href="/contact-us">Contato</Link>
							</li>
						</ul>
					</div>

					<div className="md:flex-1 mx-auto px-2">
						<Link href="/">
							<span className="font-bold text-xl">
								<Image
									width={300}
									height={300}
									className="mask hidden md:inline-block mr-3 mask-circle w-12"
									src="/logo.jpeg"
									alt="Logo"
								/>
							</span>
							<span className="font-bold text-xl">Vitrine virtual</span>
						</Link>
					</div>
				</div>

				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal custom-menu">
						<li className="mr-2">
							<Link href="/pricing">Planos</Link>
						</li>
						<li className="mr-2">
							<Link href="/contact-us">Contato</Link>
						</li>
					</ul>
				</div>
				<div className="navbar-end hidden lg:flex">
					<button className="btn btn-sm text-xs mr-4 normal-case md:btn-ghost ">Fazer login</button>
					<Link href="/start-designing">
						<button className="btn md:mt-0 mt-4 btn-block btn-sm text-xs btn-outline normal-case hover:text-white hover:btn-primary">
							Se cadastrar
						</button>
					</Link>
				</div>
			</div>
		</nav>
	);
}
