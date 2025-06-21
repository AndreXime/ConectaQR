import Image from 'next/image';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

export default function hero() {
    return (
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 text-center">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 leading-tight">
                    Crie sua <span className="gradient-text">vitrine digital</span> e exponha seus produtos em minutos!
                </h2>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-10">
                    Modernize seu negócio de forma gratuita com nossa plataforma. Crie catálogos digitais, gerencie
                    produtos e conecte-se com seus clientes através de QR Codes.
                </p>
                <div className="flex justify-center flex-col sm:flex-row gap-4">
                    <Link
                        href="#cta"
                        className="gradient-bg px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-700 transform hover:scale-105 shadow-lg"
                    >
                        Criar minha página grátis
                    </Link>
                    <Link
                        href="#cta"
                        className="bg-indigo-600 text-white px-8 py-4 flex justify-center items-center gap-2 rounded-lg font-bold text-lg hover:bg-indigo-700 transform hover:scale-105 shadow-lg"
                    >
                        <FaSearch /> Ver empresas cadastradas
                    </Link>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-16">
                <div className=" rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                        src="/assets/hero.png"
                        alt="Imagem do hero, uma pessoa olhando o celular dentro do supermercado"
                        width={1200}
                        height={1200}
                        className="object-cover w-full"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
