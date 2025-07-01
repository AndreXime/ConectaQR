import Image from 'next/image';

interface ProductCardProps {
    name: string;
    image: string;
    price: string;
}

export default function ProductCard({ name, image, price }: ProductCardProps) {
    return (
        <div className="flex-shrink-0 snap-start px-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transform hover:-translate-y-1 transition-transform duration-300">
                <Image src={image} alt={name} width={600} height={400} className="w-full h-56 object-cover" />
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
                    <p className="text-lg font-bold text-indigo-600">R$ {price}</p>
                </div>
            </div>
        </div>
    );
}
