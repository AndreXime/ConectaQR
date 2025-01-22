type FooterProps = {
	EmpresaName: string;
	Telefone: string;
};
export default function Footer({ EmpresaName, Telefone }: FooterProps) {
	return (
		<footer className="bg-base-300 text-base-content p-4">
			<div className="container mx-auto text-center">
				<p>
					{EmpresaName} | Contato: {Telefone}
				</p>
				<p>Vitrine virtual - Todos os direitos reservados. &copy; {new Date().getFullYear()} </p>
			</div>
		</footer>
	);
}
