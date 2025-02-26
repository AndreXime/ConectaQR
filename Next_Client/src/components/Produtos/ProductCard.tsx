import Image from 'next/image';

interface ProductCardProps {
	name: string;
	image: string;
	price: string;
	className?: string;
}

export default function ProductCard({ name, image, price, className }: ProductCardProps) {
	return (
		<div className={'bg-base-100 rounded-xl ' + className}>
			<div className="w-full h-55 overflow-hidden flex items-center justify-center select-none">
				<Image
					width={500}
					height={500}
					src={image}
					alt={name}
					className="w-full h-full object-contain"
				/>
			</div>
			<div className="py-4 px-3">
				<h6 className="text-base leading-6 text-base-content h-12 line-clamp-2">{name}</h6>
				<h6 className="font-semibold md:text-lg mt-3 text-indigo-600">R$ {price}</h6>
			</div>
		</div>
	);
}
