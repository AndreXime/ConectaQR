import { BookOpen, Settings2, Paintbrush, LinkIcon, BarChart2, Share2 } from 'lucide-react';

export default function FeaturesSection() {
    return (
        <section id="features" className="py-20 px-6 bg-base-100">
            <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold">Recursos que transformam seu negócio</h3>
                <p className="text-lg text-gray-600 mt-2">
                    Tudo o que você precisa para criar uma presença digital de sucesso.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-[1300px]">
                <FeatureCard
                    icon={<BookOpen />}
                    title="Catálogo Digital"
                    colors="bg-indigo-100 text-indigo-600"
                    description="Exponha seus produtos de forma organizada e atraente."
                />
                <FeatureCard
                    icon={<Settings2 />}
                    title="Gestão de Produtos"
                    colors="bg-pink-100 text-pink-600"
                    description="Adicione, edite, e remova produtos facilmente."
                />
                <FeatureCard
                    icon={<Paintbrush />}
                    title="Loja Personalizada"
                    colors="bg-emerald-100 text-emerald-600"
                    description="Altere cores, banners e layout da sua marca."
                />
                <FeatureCard
                    icon={<LinkIcon />}
                    title="Domínio Próprio"
                    colors="bg-orange-100 text-orange-600"
                    description="Utilize seu próprio domínio para mais credibilidade."
                />
                <FeatureCard
                    icon={<BarChart2 />}
                    title="Relatório de Acessos"
                    colors="bg-purple-100 text-purple-600"
                    description="Acompanhe quantas pessoas acessam sua página."
                />
                <FeatureCard
                    icon={<Share2 />}
                    title="Fácil Compartilhamento"
                    colors="bg-green-100 text-green-600"
                    description="Divulgue sua loja em redes sociais e WhatsApp."
                />
            </div>
        </section>
    );
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; colors: string }> = ({
    icon,
    title,
    colors,
    description,
}) => (
    <div className="bg-base-100 p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300 feature-card">
        <div className="flex items-center gap-4 mb-4">
            <div className={colors + ' p-3 rounded-lg'}>{icon}</div>
            <h4 className="text-xl font-semibold">{title}</h4>
        </div>
        <p className="text-gray-600">{description}</p>
    </div>
);
