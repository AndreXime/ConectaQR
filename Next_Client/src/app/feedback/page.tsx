'use client';
import { Drawer, Footer } from '@/components/Home';

export default function Feedback() {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);

		alert(`Dúvida enviada com sucesso! ${data}`);
		e.currentTarget.reset();
	};

	return (
		<Drawer>
			<div className="min-h-screen bg-base-200 py-10 px-4 flex justify-center">
				<div className="card shadow-xl p-7 bg-base-100">
					{/* Título */}
					<h1 className="text-3xl font-bold text-center mb-6">Feedback e Suporte</h1>

					{/* FAQ - Perguntas Frequentes */}
					<div className="mb-10">
						<h2 className="text-2xl font-semibold mb-4">Perguntas Frequentes</h2>

						<div className="join join-vertical w-full">
							<div className="collapse collapse-arrow bg-base-100">
								<input
									type="radio"
									name="faq"
								/>
								<div className="collapse-title text-lg font-medium">Como posso entrar em contato?</div>
								<div className="collapse-content">
									<p>Você pode preencher o formulário abaixo ou enviar um e-mail para suporte@exemplo.com</p>
								</div>
							</div>

							<div className="collapse collapse-arrow bg-base-100">
								<input
									type="radio"
									name="faq"
								/>
								<div className="collapse-title text-lg font-medium">Quanto tempo demora para obter uma resposta?</div>
								<div className="collapse-content">
									<p>Normalmente, respondemos dentro de 24 horas úteis.</p>
								</div>
							</div>

							<div className="collapse collapse-arrow bg-base-100">
								<input
									type="radio"
									name="faq"
								/>
								<div className="collapse-title text-lg font-medium">Posso enviar sugestões?</div>
								<div className="collapse-content">
									<p>Sim! Adoramos ouvir sugestões para melhorar nossa plataforma.</p>
								</div>
							</div>
						</div>
					</div>

					{/* Formulário de Dúvida */}
					<div className="card bg-base-100 shadow-xl p-2">
						<h2 className="text-2xl font-semibold mb-4">Envie como foi sua experiencia</h2>

						<form
							onSubmit={handleSubmit}
							className="space-y-4">
							<div>
								<label className="label">
									<span className="label-text">Nome</span>
								</label>
								<input
									type="text"
									name="name"
									className="input input-bordered w-full"
									placeholder="Seu nome"
									required
								/>
							</div>

							<div>
								<label className="label">
									<span className="label-text">E-mail</span>
								</label>
								<input
									type="email"
									name="email"
									className="input input-bordered w-full"
									placeholder="Seu e-mail"
									required
								/>
							</div>

							<div>
								<label className="label">
									<span className="label-text">Mensagem</span>
								</label>
								<textarea
									name="message"
									className="textarea textarea-bordered w-full"
									placeholder="Descreva sua experiencia"
									rows={4}
									required></textarea>
							</div>

							<button
								type="submit"
								className="btn btn-primary w-full">
								Enviar Feedback
							</button>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</Drawer>
	);
}
