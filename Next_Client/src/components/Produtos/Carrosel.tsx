'use client';
import type { Produto } from '@/lib/types';
import { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import Glide, { Swipe, Breakpoints, Autoplay } from '@glidejs/glide/dist/glide.modular.esm';
import '@glidejs/glide/dist/css/glide.core.min.css';

export default function Slider({ data }: { data: Produto[] }) {
	const sliderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!sliderRef.current) return;
		// Se o tamanho do array de produtos for menor q o esperado ajustar para o proprio tamanho
		const slider = new Glide(sliderRef.current, {
			type: 'slider',
			gap: 1,
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
							className="glide__slide p-2"
							key={produto.nome + produto.preco}>
							<ProductCard
								name={produto.nome}
								price={produto.preco}
								image={produto.imagemUrl}
								className="cursor-grab border-base-300 border-2"
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
