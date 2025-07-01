import Link from 'next/link';

export default function CTASection() {
    return (
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600 to-teal-500 text-white">
            <div className="px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Pronto para modernizar seu negócio?
                        </h2>
                        <p className="mx-auto max-w-[700px] md:text-xl">
                            Junte-se a milhares de lojistas que já estão mostrando seus produtos online
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <Link
                            href={'/acesso'}
                            className="gradient-bg btn btn-lg border-none w-full min-[400px]:w-auto  hover:bg-gray-100"
                        >
                            Começar Gratuitamente
                        </Link>
                        <Link
                            href={'/demo'}
                            className="btn btn-lg btn-outline w-full min-[400px]:w-auto border-white text-white hover:bg-white/10"
                        >
                            Ver Demonstração
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
