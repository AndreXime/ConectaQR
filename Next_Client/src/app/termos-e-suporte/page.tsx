'use client';
import { Drawer, Footer } from '@/components/Home';
import { faqs, termos } from '@/content';
import { useState } from 'react';

export default function CompaniesPage() {
	const [activeTab, setActiveTab] = useState<'faq' | 'termos'>('faq');

	return (
		<Drawer>
			<div className="min-h-dvh bg-base-100 flex flex-col">
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
					<div className="px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500">
									Termos & Suporte
								</h1>
								<p className="max-w-[700px] text-gray-600 md:text-xl mx-auto">
									Encontre respostas para suas dúvidas ou entre em contato conosco
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Seção com Tabs */}
				<section className="w-full py-12 md:py-24">
					<div className="px-4 md:px-6">
						<div className="tabs flex justify-center mb-10">
							<a
								className={`tab text-lg tab-bordered ${activeTab === 'faq' ? 'tab-active' : ''}`}
								onClick={() => setActiveTab('faq')}>
								Perguntas Frequentes
							</a>
							<a
								className={`tab text-lg tab-bordered ${activeTab === 'termos' ? 'tab-active' : ''}`}
								onClick={() => setActiveTab('termos')}>
								Termos de Uso
							</a>
						</div>

						{activeTab === 'faq' && (
							<div className="space-y-8">
								<div className="grid gap-8 md:grid-cols-2">
									<div>
										<h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
										<div className="space-y-4">
											{faqs.map((faq, index) => (
												<div
													key={index}
													tabIndex={0}
													className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
													<div className="collapse-title font-medium">{faq.question}</div>
													<div className="collapse-content">
														<p>{faq.answer}</p>
													</div>
												</div>
											))}
										</div>
									</div>

									{/* Card de formulário */}
									<div className="card bg-base-100 shadow-xl">
										<div className="card-body">
											<h2 className="card-title">Ainda tem dúvidas?</h2>
											<p>Preencha o formulário abaixo e entraremos em contato o mais breve possível.</p>
											<form className="space-y-4 mt-4">
												<div>
													<label
														htmlFor="name"
														className="label">
														Nome
													</label>
													<input
														id="name"
														type="text"
														placeholder="Seu nome completo"
														className="input input-bordered w-full"
													/>
												</div>
												<div>
													<label
														htmlFor="email"
														className="label">
														Email
													</label>
													<input
														id="email"
														type="email"
														placeholder="seu@email.com"
														className="input input-bordered w-full"
													/>
												</div>
												<div>
													<label
														htmlFor="subject"
														className="label">
														Assunto
													</label>
													<input
														id="subject"
														type="text"
														placeholder="Assunto da sua mensagem"
														className="input input-bordered w-full"
													/>
												</div>
												<div>
													<label
														htmlFor="message"
														className="label">
														Mensagem
													</label>
													<textarea
														id="message"
														placeholder="Descreva sua dúvida em detalhes"
														className="textarea textarea-bordered w-full"
														rows={4}></textarea>
												</div>
												<button
													type="submit"
													className="btn btn-primary w-full bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600">
													Enviar Mensagem
												</button>
											</form>
										</div>
									</div>
								</div>
							</div>
						)}

						{activeTab === 'termos' && (
							<div className="prose prose-purple dark:prose-invert max-w-none">
								<h2 className="text-2xl font-bold">Termos de Uso da VitrineDigital</h2>
								<p className="text-gray-600">Última atualização: {new Date().toLocaleDateString()}</p>

								{termos.map((termo, index) => (
									<div key={index}>
										<h3 className="text-xl font-semibold mt-6">{termo.title}</h3>
										<p>{termo.content}</p>
									</div>
								))}
							</div>
						)}
					</div>
				</section>
			</div>
			<Footer />
		</Drawer>
	);
}
