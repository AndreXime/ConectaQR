import { FaUser, FaBuilding, FaBox, FaPaintBrush } from 'react-icons/fa';
const generationStepData = [
	{
		icon: <FaBuilding className="w-10 h-10 inline-block mr-2" />,
		description: 'Faça o cadastro da sua empresa',
	},
	{
		icon: <FaPaintBrush className="w-10 h-10 inline-block mr-2" />,
		description: 'Personalize sua loja com descricao, tema e meios de contato',
	},
	{
		icon: <FaBox className="w-10 h-10 inline-block mr-2" />,
		description: 'Adicione seu produtos com imagens e suas categorias',
	},
	{
		icon: <FaUser className="w-10 h-10 inline-block mr-2" />,
		description: 'Gere um QRCode e imprima na sua loja presencial',
	},
];

export default function GenerationStep() {
	return (
		<>
			<section className="grid place-items-center bg-base-100 w-full ">
				<div className="max-w-6xl w-full py-24 px-4 content-center justify-center">
					<h2 className="text-3xl  text-center font-bold">Tenha sua página em passos simples</h2>
					<div className="grid mt-24 md:grid-cols-4 grid-cols-1 gap-8">
						{generationStepData.map((i, k) => (
							<div
								key={k}
								className="card w-full shadow-xl hover:shadow-2xl">
								<div className="grid -mt-4 place-items-center">
									<div className="w-8 h-8  rounded-full  bg-amber-500 text-slate-100 flex font-bold justify-center items-center">
										<p>{k + 1}</p>
									</div>
								</div>
								<div className="card-body  items-center text-center">
									<p className="text-primary">{i.icon}</p>
									<p className="mt-2 font-bold"> {i.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
