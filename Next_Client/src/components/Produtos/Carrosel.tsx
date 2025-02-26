'use client';
import type { Produto } from '@/lib/types';
import { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import Glide, { Swipe, Breakpoints, Autoplay } from '@glidejs/glide/dist/glide.modular.esm';
import '@glidejs/glide/dist/css/glide.core.min.css';

type Prop = {
	data: Produto[];
};

export default function Slider({ data }: Prop) {
	const sliderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!sliderRef.current) return;
		const slider = new Glide(sliderRef.current, {
			type: 'carousel',
			gap: 10,
			autoplay: 5000,
			perView: 4,
			touchRatio: 1,
			breakpoints: {
				768: { perView: 2 },
				1024: { perView: 3 },
			},
		});

		slider.mount({ Swipe, Breakpoints, Autoplay });

		// Limpeza ao desmontar o componente
		return () => {
			slider.destroy();
		};
	}, []);

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
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
