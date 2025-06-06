import { features } from '@/content';

export default function FeaturesSection() {
	return (
		<section
			id="recursos"
			className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 ">
			<div className="px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							Recursos que transformam seu negócio
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
							Tudo o que você precisa para criar uma presença digital eficiente
						</p>
					</div>
				</div>
				<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
					{features.map((card, index) => (
						<div
							key={index}
							className="card bg-base-100 shadow-xl h-full">
							<div className="card-body">
								<h2 className="card-title">{card.title}</h2>
								<p>{card.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
