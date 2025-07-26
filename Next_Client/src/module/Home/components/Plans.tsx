import { CheckCircle2, Sparkles, Heart, Gift, ThumbsUp } from 'lucide-react';
import Link from 'next/link';

export default function PricingPlans() {
    return (
        <section id="pricing" className="py-20 bg-base-200">
            <div className="container mx-auto px-6 text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold">Planos flexíveis para você</h3>
                <p className="text-lg text-gray-600 mt-2">Comece de graça e evolua conforme seu negócio cresce.</p>
            </div>
            <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-center items-stretch gap-8 max-w-4xl">
                <div className="w-full lg:w-1/2 border-2 border-indigo-600 rounded-2xl p-8 shadow-2xl relative">
                    <span className="absolute top-0 -translate-y-1/2 bg-indigo-600 text-white text-sm font-bold px-4 py-1 rounded-full">
                        MAIS POPULAR
                    </span>
                    <h4 className="text-2xl font-bold mb-2">Plano Grátis</h4>
                    <p className="text-5xl font-black mb-4">
                        R$0 <span className="text-lg font-medium text-gray-500">/para sempre</span>
                    </p>
                    <ul className="space-y-4 mb-8 text-left">
                        {[
                            'Cadastro de produtos ilimitado',
                            'Página personalizada',
                            'Geração de QR Code',
                            'Link compartilhável',
                        ].map((item) => (
                            <li className="flex items-center gap-3" key={item}>
                                <CheckCircle2 className="text-green-500" /> <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="#"
                        className="w-full block text-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700"
                    >
                        Começar Gratuitamente
                    </Link>
                </div>
                <div className="w-full lg:w-1/2 border border-gray-200 rounded-2xl p-8 bg-base-100">
                    <h4 className="text-2xl font-bold mb-2">Apoie o Projeto</h4>
                    <p className="text-5xl font-black mb-4">Doação</p>
                    <p className="text-gray-600 mb-6">Gostou do nosso trabalho? Considere fazer uma doação.</p>
                    <ul className="space-y-4 mb-8 text-left">
                        {[
                            'Todos os recursos do plano grátis',
                            'Apoio direto aos desenvolvedores',
                            'Acesso antecipado a novos recursos',
                            'Nossa eterna gratidão',
                        ].map((item, idx) => (
                            <li className="flex items-center gap-3" key={idx}>
                                {{ 0: <Sparkles />, 1: <Heart />, 2: <Gift />, 3: <ThumbsUp /> }[idx]}{' '}
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="#"
                        className="w-full block text-center bg-gray-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-900"
                    >
                        Fazer uma Doação
                    </Link>
                </div>
            </div>
        </section>
    );
}
