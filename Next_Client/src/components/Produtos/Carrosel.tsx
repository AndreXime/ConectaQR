'use client';
import type { Produto } from '@/lib/types';
import { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import Glide, { Swipe, Breakpoints, Autoplay } from '@glidejs/glide/dist/glide.modular.esm';
import '@glidejs/glide/dist/css/glide.core.min.css';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

type Prop = {
	data: Produto[];
	categoria: string;
	urlCategoria: string;
};

export default function Slider({ data, categoria, urlCategoria }: Prop) {
	const sliderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!sliderRef.current) return;
		// Se o tamanho do array de produtos for menor q o esperado ajustar para o proprio tamanho
		const slider = new Glide(sliderRef.current, {
			type: 'slider',
			gap: 10,
			autoplay: 5000,
			perView: data.length + 1 < 4 ? data.length + 1 : 4,
			rewind: false,
			bound: true,
			touchRatio: 1,
			breakpoints: {
				768: { perView: data.length + 1 < 2 ? data.length + 1 : 2 },
				1024: { perView: data.length + 1 < 3 ? data.length + 1 : 3 },
			},
		});

		slider.mount({ Swipe, Breakpoints, Autoplay });

		// Limpeza ao desmontar o componente
		return () => {
			slider.destroy();
		};
	}, [data.length]);

	return (
		<div
			ref={sliderRef}
			className="glide">
			<div
				className="glide__track"
				data-glide-el="track">
				<ul className="glide__slides">
					{data.map((produto) => (
						<li
							className="glide__slide"
							key={produto.nome + produto.preco}>
							<ProductCard
								name={produto.nome}
								price={produto.preco}
								image={produto.imagemUrl}
								className="cursor-grab border-1"
							/>
						</li>
					))}
					<li className="glide__slide">
						<Link href={urlCategoria}>
							<div className="bg-base-100 rounded-xl border-1 h-85 flex flex-col items-center justify-center">
								<div className="flex flex-col items-center gap-10">
									<FaArrowRight size={50} />
									<h6 className="text-lg text-center font-semibold leading-6 text-base-content h-12 line-clamp-2">
										Ver mais de {categoria}
									</h6>
								</div>
							</div>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
