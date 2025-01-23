import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

type HeaderProps = {
	EmpresaName: string;
	Icon: boolean;
	Tab?: string;
};
export default function Header({ EmpresaName, Icon, Tab }: HeaderProps) {
	return (
		<nav className="bg-base-300 p-3 shadow">
			<div className="container mx-auto flex justify-center items-center">
				<Link
					className={`${Icon ? '' : 'hidden'}`}
					href={`/${EmpresaName}`}>
					<FaHome
						size={25}
						className="fixed top-5 left-5"
					/>
				</Link>
				<Link
					href={`/${EmpresaName}`}
					className="btn btn-ghost">
					<h1 className="text-center text-2xl font-extrabold">
						{EmpresaName} {Tab}
					</h1>
				</Link>
			</div>
		</nav>
	);
}
