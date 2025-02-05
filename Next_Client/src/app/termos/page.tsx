import { Drawer, Footer } from '@/components/Home';

export default async function CompaniesPage() {
	return (
		<Drawer>
			<div className="min-h-screen bg-base-200 py-10 px-4 flex justify-center">
				<div className="card shadow-xl bg-base-100">
					<div className="card-body">
						<h1 className="text-3xl font-bold mb-4">Termos de Uso e Política de Privacidade</h1>

						<section className="mb-6">
							<h2 className="text-xl font-semibold mb-2">1. Introdução</h2>
							<p className="text-gray-600">
								Bem-vindo ao nosso serviço! Ao acessar nosso site, você concorda com os seguintes termos e condições.
							</p>
						</section>

						<section className="mb-6">
							<h2 className="text-xl font-semibold mb-2">2. Coleta de Informações</h2>
							<p className="text-gray-600">
								Coletamos dados para melhorar sua experiência. Isso pode incluir nome, e-mail e preferências de uso.
							</p>
						</section>

						<section className="mb-6">
							<h2 className="text-xl font-semibold mb-2">3. Uso das Informações</h2>
							<p className="text-gray-600">
								Utilizamos suas informações apenas para fins de comunicação e personalização do serviço. Não vendemos
								seus dados para terceiros.
							</p>
						</section>

						<section className="mb-6">
							<h2 className="text-xl font-semibold mb-2">4. Segurança dos Dados</h2>
							<p className="text-gray-600">
								Implementamos medidas de segurança para proteger suas informações, mas não podemos garantir segurança
								absoluta.
							</p>
						</section>

						<section className="mb-6">
							<h2 className="text-xl font-semibold mb-2">5. Alterações nos Termos</h2>
							<p className="text-gray-600">
								Podemos modificar estes termos a qualquer momento. As alterações serão notificadas em nosso site.
							</p>
						</section>

						<div className="mt-6">
							<p className="text-sm text-gray-500">Última atualização: Fevereiro de 2025</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</Drawer>
	);
}
