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
			<div className="container mx-auto flex relative justify-center items-center">
				<Link
					className={`${Icon ? '' : 'hidden'}`}
					href={`/${EmpresaName.replace(/-/g, ' ')}`}>
					<FaHome
						size={25}
						className="absolute left-0 top-2 "
					/>
				</Link>
				<Link
					href={`/${EmpresaName}`}
					className="btn btn-ghost">
					<h1 className="text-center text-2xl font-extrabold capitalize">
						{EmpresaName} {Tab}
					</h1>
				</Link>
			</div>
		</nav>
	);
}
