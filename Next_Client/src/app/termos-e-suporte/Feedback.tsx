'use client';

export default function Feedback() {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);
		const formInputs = Object.fromEntries(formData.entries());

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formInputs),
			});

			if (!response.ok) {
				alert('Erro ao enviar feedback');
			} else {
				alert('Feedback enviado com sucesso');

				form.reset();
			}
		} catch {
			alert('Erro ao enviar feedback');
		}
	};

	return (
		<div className="card shadow-xl py-10 px-5 lg:max-w-1/2 mx-auto bg-base-100">
			{/* Título */}
			<h1 className="text-3xl font-bold text-center mb-6">Feedback e Suporte</h1>

			{/* FAQ - Perguntas Frequentes */}
			<div className="mb-10">
				<h2 className="text-2xl font-semibold mb-4 p-2">Perguntas Frequentes</h2>

				<div className="join join-vertical w-full">
					<div className="collapse collapse-arrow bg-base-100">
						<input
							type="radio"
							name="faq"
						/>
						<div className="collapse-title text-lg font-medium">Como posso entrar em contato?</div>
						<div className="collapse-content">
							<p>Você pode preencher o formulário abaixo e adoramos ouvir sugestões para melhorar nossa plataforma</p>
						</div>
					</div>
					<div className="collapse collapse-arrow bg-base-100">
						<input
							type="radio"
							name="faq"
						/>
						<div className="collapse-title text-lg font-medium">A plataforma é gratuita?</div>
						<div className="collapse-content">
							<p>
								Nosso objetivo é manter a plataforma gratuita para todos. No entanto, para cobrir custos de servidores e
								manutenção, contamos com doações da comunidade. Se quiser apoiar, sua contribuição é essencial para
								manter o serviço online.
							</p>
						</div>
					</div>
					<div className="collapse collapse-arrow bg-base-100">
						<input
							type="radio"
							name="faq"
						/>
						<div className="collapse-title text-lg font-medium">Minha conta será pública?</div>
						<div className="collapse-content">
							<p>
								Sim, ao criar uma conta, ela será pública com as informações que você preencher. Certifique-se de
								revisar e compartilhar apenas os dados que deseja tornar visíveis para clientes.
							</p>
						</div>
					</div>
					<div className="collapse collapse-arrow bg-base-100">
						<input
							type="radio"
							name="faq"
						/>
						<div className="collapse-title text-lg font-medium">
							Posso editar minhas informações depois de criar a conta?
						</div>
						<div className="collapse-content">
							<p>
								Sim, você pode atualizar ou remover certos dados sempre que quiser através das configurações da sua
								conta.
							</p>
						</div>
					</div>
					<div className="collapse collapse-arrow bg-base-100">
						<input
							type="radio"
							name="faq"
						/>
						<div className="collapse-title text-lg font-medium">Como posso contribuir com a plataforma?</div>
						<div className="collapse-content">
							<p>
								Você pode contribuir fazendo uma doação ou ajudando a divulgar nosso projeto para mais pessoas. Toda
								ajuda é essencial para manter a plataforma acessível!
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Formulário de Dúvida */}
			<div className="bg-base-100 p-2">
				<h2 className="text-2xl font-semibold mb-4">Conte como foi sua experiencia</h2>

				<form
					onSubmit={handleSubmit}
					className="space-y-4">
					<div>
						<label className="label">
							<span className="label-text">Nome</span>
						</label>
						<input
							type="text"
							name="nome"
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
							name="mensagem"
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
	);
}
