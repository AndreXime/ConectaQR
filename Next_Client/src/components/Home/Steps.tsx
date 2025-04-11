import { FaGear, FaQrcode, FaStore, FaUpload } from 'react-icons/fa6';
const generationStepData = [
	{
		icon: <FaStore className="h-6 w-6 text-purple-600 " />,
		bg: 'bg-purple-100',
		title: '1. Cadastre sua empresa',
		description: 'Registre sua loja com informações básicas para começar',
	},
	{
		icon: <FaGear className="h-6 w-6 text-blue-600 " />,
		bg: 'bg-blue-100',
		title: '2. Personalize sua loja',
		description: 'Adicione descrição, escolha um tema e configure meios de contato',
	},
	{
		icon: <FaUpload className="h-6 w-6 text-teal-600 " />,
		bg: 'bg-teal-100',
		title: '3. Adicione seus produtos',
		description: 'Cadastre produtos com imagens e organize em categorias',
	},
	{
		icon: <FaQrcode className="h-6 w-6 text-amber-600 " />,
		bg: 'bg-amber-100',
		title: '4. Gere um QR Code',
		description: 'Imprima e coloque na sua loja física para clientes acessarem',
	},
];

export default function GenerationStep() {
	return (
		<section
			id="como-funciona"
			className="w-full py-12 md:py-24 lg:py-32">
			<div className="px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							Tenha sua página em passos simples
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
							Comece a mostrar seus produtos online em apenas alguns minutos
						</p>
					</div>
				</div>
				<div className="mx-auto grid px-10 items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
					{generationStepData.map((step) => (
						<div
							key={step.title}
							className="flex flex-col items-center space-y-2 border rounded-lg p-6 shadow-sm h-full">
							<div className={'flex h-12 w-12 items-center justify-center rounded-full ' + step.bg}>{step.icon}</div>
							<h3 className="text-xl font-bold">{step.title}</h3>
							<p className="text-sm text-muted-foreground text-center">{step.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
