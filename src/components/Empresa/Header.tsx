type HeaderProps = {
	EmpresaName: string;
};
export default function Heade({ EmpresaName }: HeaderProps) {
	return (
		<nav className="bg-base-300 p-3 shadow">
			<div className="container mx-auto flex justify-center items-center">
				<h1 className="text-center text-2xl font-extrabold">{EmpresaName}</h1>
			</div>
		</nav>
	);
}
