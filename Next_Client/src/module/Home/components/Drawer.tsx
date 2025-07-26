'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaArrowRight, FaBars } from 'react-icons/fa';

interface props {
    absolute?: boolean;
}

const navLinks = [
    { label: 'Empresas parceiras', href: '/empresas' },
    { label: 'Painel da empresa', href: '/acesso' },
    { label: 'Sobre a plataforma', href: '/sobre-nos' },
];

export default function Drawer({ absolute }: props) {
    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <>
            <nav className={`navbar bg-base-100 border-b-2 border-gray-200 w-full px-5 ${absolute && 'absolute'}`}>
                <div className="lg:hidden absolute">
                    <label
                        aria-label="open sidebar"
                        className="btn btn-square btn-ghost"
                        onClick={() => setMobileMenu(!mobileMenu)}
                    >
                        <FaBars size={20} />
                    </label>
                </div>
                <Link href="/" className=" flex-1 px-2 text-xl font-bold text-center lg:text-left items-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
                        Conecta<span className="font-black text-pink-500">QR</span>
                    </h1>
                </Link>
                <div className="hidden flex-none lg:block">
                    <ul className="menu menu-horizontal ">
                        {navLinks.map(({ label, href }) => (
                            <li key={href} className="px-1">
                                <Link className="btn btn-primary btn-ghost" href={href}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
            {/* Navbar mobile */}
            {mobileMenu && (
                <div className="fixed inset-0 z-50">
                    {/* Overlay que fecha o menu ao clicar */}
                    <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenu(false)}>
                        <button className="absolute bg-base-200 top-2 right-2 p-3 py-2 rounded-full text-xl">✕</button>{' '}
                    </div>

                    {/* Menu lateral */}
                    <ul className="menu bg-base-200 min-h-full w-60 relative z-10">
                        <li className="text-lg font-bold text-center mt-4 mb-7">Navegação do site</li>
                        {navLinks.map(({ label, href }) => (
                            <li key={href}>
                                <Link className="btn btn-primary btn-ghost mb-3 flex justify-between" href={href}>
                                    {label} <FaArrowRight />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
