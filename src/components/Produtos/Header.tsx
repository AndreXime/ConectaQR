type HeaderProps = {
	EmpresaName: string;
};
export default function Heade({ EmpresaName }: HeaderProps) {
	return (
		<nav className="bg-base-300 p-3 shadow">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">{EmpresaName}</h1>
				<input
					type="text"
					placeholder="Pesquisar produtos..."
					className="input input-bordered max-w-xs"
				/>
			</div>
		</nav>
	);
}
