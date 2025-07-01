import { Building, PackagePlus, Palette, QrCode } from 'lucide-react';

export default function GenerationStep() {
    return (
        <section id="how-it-works" className="py-20 bg-base-200">
            <div className="container mx-auto px-6 text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold">Tenha sua página em 4 passos simples</h3>
                <p className="text-lg text-gray-600 mt-2">Comece a vender online de forma rápida e intuitiva.</p>
            </div>
            <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StepCard
                    icon={<Building className="w-8 h-8 text-purple-600" />}
                    bg="bg-purple-100"
                    title="1. Cadastre sua empresa"
                    description="Preencha as informações básicas do seu negócio."
                />
                <StepCard
                    icon={<Palette className="w-8 h-8 text-blue-600" />}
                    title="2. Personalize sua loja"
                    bg="bg-blue-100"
                    description="Escolha cores, adicione seu logo e deixe com a sua cara."
                />
                <StepCard
                    icon={<PackagePlus className="w-8 h-8 text-teal-600" />}
                    title="3. Adicione seus produtos"
                    bg="bg-teal-100"
                    description="Inclua fotos, descrições e preços dos seus itens."
                />
                <StepCard
                    icon={<QrCode className="w-8 h-8 text-amber-600" />}
                    title="4. Gere seu QR Code"
                    bg="bg-amber-100"
                    description="Compartilhe o QR Code e o link da sua página."
                />
            </div>
        </section>
    );
}

const StepCard: React.FC<{ icon: React.ReactNode; title: string; description: string; bg: string }> = ({
    icon,
    title,
    bg,
    description,
}) => (
    <div className="p-8 border border-gray-200 rounded-2xl text-center bg-base-100">
        <div className={bg + ' text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6'}>
            {icon}
        </div>
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
    </div>
);
