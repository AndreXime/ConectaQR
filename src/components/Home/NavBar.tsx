import Link from 'next/link';
import { FaHamburger } from 'react-icons/fa';

export default function Navbar() {
	return (
		<div className="w-full flex justify-center  shadow-lg  ">
			<div className="navbar py-2 bg-base-100 max-w-6xl">
				<div className="navbar-start ">
					<div className="flex-none lg:hidden">
						<label
							htmlFor="my-drawer-3"
							className="btn btn-square btn-ghost">
							<FaHamburger className="h-5 inline-block w-5" />
						</label>
					</div>

					<div className="md:flex-1 flex-none px-2 mx-2">
						<Link href="/">
							<span className="font-bold text-xl">
								<img
									className="mask inline-block mr-3 mask-circle w-12"
									src="/logo.jpeg"
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
		</div>
	);
}
