'use client';
import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

interface ProductCarouselProps {
    title: string;
    children: React.ReactNode;
    categoryHref: string;
}

export default function Carrosel({ title, children, categoryHref }: ProductCarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (carouselRef.current) {
            // Pega a largura do primeiro card para saber o quanto rolar
            const scrollAmount = carouselRef.current.firstElementChild?.clientWidth || 300;
            carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.firstElementChild?.clientWidth || 300;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
    return (
        <section className="mb-16">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-extrabold text-gray-900 border-b-2 border-indigo-500 pb-2">{title}</h2>
                <div className="flex items-center gap-3">
                    <Link
                        href={categoryHref}
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition"
                    >
                        Ver mais
                    </Link>
                    <button
                        onClick={scrollLeft}
                        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                        aria-label={`Scroll left in ${title}`}
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                        aria-label={`Scroll right in ${title}`}
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>

            <div
                ref={carouselRef}
                className="flex items-stretch overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            >
                {children}
            </div>
        </section>
    );
}
