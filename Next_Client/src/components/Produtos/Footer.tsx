type FooterProps = {
	EmpresaName: string;
};
export default function Footer({ EmpresaName }: FooterProps) {
	return (
		<footer className="bg-primary text-primary-content p-4">
			<div className="container mx-auto text-center">
				<p className="capitalize">{EmpresaName}</p>
				<p>ConectaQR - Todos os direitos reservados. &copy; {new Date().getFullYear()} </p>
			</div>
		</footer>
	);
}
