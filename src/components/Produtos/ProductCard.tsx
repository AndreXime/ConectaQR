import Image from 'next/image';

interface ProductCardProps {
	name: string;
	image: string;
	price: string;
	categorias: string[];
}

export default function ProductCard({ name, image, price, categorias }: ProductCardProps) {
	return (
		<div className="bg-base-200 animate-fadeIn">
			<div className="mx-auto sm:mr-0 group lg:mx-auto bg-white transition-all duration-500">
				<Image
					width={1000}
					height={1000}
					src={image}
					alt={name}
					className="w-full h-60 object-cover"
				/>
				<div className="mt-5 px-4 pb-4 pt-0">
					<h6 className="font-semibold text-xl leading-8 truncate text-black">{name}</h6>
					<h6 className="font-semibold text-xl leading-8 text-indigo-600">{price}</h6>
					<div className="font-semibold text-sm leading-6 flex justify-start gap-4">Tags: {categorias.join(', ')}</div>
				</div>
			</div>
		</div>
	);
}
