import { Drawer, Footer } from '@/components/Home';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default async function CompaniesPage() {
	return (
		<Drawer>
			<div className=" bg-base-200 py-10 px-4 flex justify-center">
				<div className="card shadow-xl lg:max-w-1/2 bg-base-100">
					<div className="card-body ">
						<h1 className="text-3xl font-bold mb-4">Sobre a plataforma</h1>
						<section className="mb-6">
							<h2 className="text-xl font-semibold mb-2">Nossa equipe</h2>
							<p className="text-base-content">
								Esta plataforma foi desenvolvida por uma único estudante de ciencias da computação
							</p>
						</section>
						<section className="mb-6">
							<h2 className="text-xl font-semibold mb-2">Como foi feito</h2>
							<p className="text-base-content">
								A plataforma foi criado usando tecnologias do ecossistema Node.js como Next.js, Express e outras
								bibliotecas auxiliares. Estilização foi feito com TailwindCSS e DaisyUI
								<br />
							</p>
							<p className="mt-4">
								O código-fonte é aberto e pode ser acessado por qualquer pessoa interessada em contribuir ou utilizar
								como referência para seus próprios projetos.
							</p>
						</section>

						<div className="flex justify-center items-center gap-5 mt-4">
							<Link href={'https://github.com/AndreXime/ConnectQR'}>
								<FaGithub size={35} />
							</Link>
							<Link href={'https://www.linkedin.com/in/andreximenes20/'}>
								<FaLinkedin
									color="blue"
									size={35}
								/>
							</Link>
						</div>

						<div className="mt-6">
							<p className="text-sm text-base-content">Última atualização: Fevereiro de 2025</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</Drawer>
	);
}
