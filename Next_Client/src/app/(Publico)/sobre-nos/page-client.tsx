'use client';
import { Footer } from '@/module/Home/components';
import { faqs, termos } from '@/module/Home/lib/content';
import { useState } from 'react';

interface serverStatus {
    online: boolean;
    lastChecked: string;
    uptime: string;
    version: string;
}

const tabs = [
    { key: 'sobre', label: 'Sobre' },
    { key: 'faq', label: 'FAQ' },
    { key: 'termos', label: 'Termos de Uso' },
];

export default function About({ serverStatus }: { serverStatus: serverStatus }) {
    const [activeTab, setActiveTab] = useState<'faq' | 'termos' | 'sobre'>('sobre');

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
        <div className="flex min-h-[100dvh] flex-col">
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 ">
                <div className="px-4 md:px-6 text-center space-y-4">
                    <h1 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500">
                        Sobre a Plataforma
                    </h1>
                    <p className="max-w-[700px] mx-auto md:text-xl text-muted-foreground">
                        Conheça mais sobre a plataforma
                    </p>
                </div>
            </section>

            <div className="w-full flex justify-center py-4">
                <div className="inline-flex space-x-2 rounded-xl bg-muted p-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                activeTab === tab.key
                                    ? 'bg-gradient-to-r from-purple-600 to-teal-500 text-white'
                                    : 'text-muted-foreground hover:bg-muted-foreground/10'
                            }`}
                            onClick={() => setActiveTab(tab.key as typeof activeTab)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <main className="flex justify-center items-center px-10 pb-15">
                {activeTab == 'sobre' && (
                    <section className="w-full py-12 container">
                        <div className="px-5 md:px-10 grid gap-10">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold">Nossa História</h2>
                                <p className="text-muted-foreground">
                                    A ConectaQR nasceu em 2023 com uma missão clara: ajudar pequenos e médios
                                    comerciantes a terem presença digital sem a complexidade e os custos de um
                                    e-commerce completo.
                                </p>
                                <p className="text-muted-foreground">
                                    Percebemos que muitas lojas físicas queriam mostrar seus produtos online, mas não
                                    necessariamente vender pela internet. Elas precisavam de uma solução simples que
                                    funcionasse como uma extensão digital de suas vitrines físicas.
                                </p>
                                <p className="text-muted-foreground font-bold">
                                    A plataforma precisa de ajudar financeira para se manter online, qualquer quantia é
                                    bem vinda
                                </p>
                            </div>

                            <div className="rounded-box shadow p-3 border border-base-300">
                                <div className="bg-gradient-to-r from-purple-600 to-teal-500 text-white rounded-box p-4 mb-4">
                                    <h3 className="text-lg font-bold">Status do Servidor</h3>
                                    <p className="text-sm opacity-80">
                                        Informações em tempo real sobre nossa plataforma
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Status:</span>
                                        <span
                                            className={`badge ${serverStatus.online ? 'badge-success' : 'badge-error'}`}
                                        >
                                            {serverStatus.online ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Última verificação:</span>
                                        <span>{serverStatus.lastChecked}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Uptime:</span>
                                        <span>{serverStatus.uptime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Versão:</span>
                                        <span>{serverStatus.version}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === 'faq' && (
                    <div className="space-y-8 conainer">
                        <div className="grid gap-8 md:grid-cols-2">
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
                                <div className="space-y-4">
                                    {faqs.map((faq, index) => (
                                        <div
                                            key={index}
                                            tabIndex={0}
                                            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
                                        >
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
                                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                        <div>
                                            <label htmlFor="nome" className="label">
                                                Nome
                                            </label>
                                            <input
                                                id="nome"
                                                name="nome"
                                                type="text"
                                                placeholder="Seu nome completo"
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="label">
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="seu@email.com"
                                                className="input input-bordered w-full"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="mensagem" className="label">
                                                Mensagem
                                            </label>
                                            <textarea
                                                id="mensagem"
                                                name="mensagem"
                                                placeholder="Descreva sua dúvida em detalhes"
                                                className="textarea textarea-bordered w-full"
                                                rows={4}
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-full bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600"
                                        >
                                            Enviar Mensagem
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'termos' && (
                    <div className="prose prose-purple dark:prose-invert max-w-none container">
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
            </main>
            <Footer />
        </div>
    );
}
