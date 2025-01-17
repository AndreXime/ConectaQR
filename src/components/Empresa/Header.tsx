export default function Header() {
	return (
		<header className="bg-base-300 p-2 shadow">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">Minha Loja</h1>
				<input
					type="text"
					placeholder="Pesquisar produtos..."
					className="input input-bordered w-full max-w-xs"
				/>
			</div>
		</header>
	);
}
