'use client';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

type Props = {
	text?: boolean;
	className?: string;
};

const getCookie = (name: string) => {
	if (typeof document === 'undefined') return null; // Para SSR
	return document.cookie
		.split('; ')
		.find((row) => row.startsWith(`${name}=`))
		?.split('=')[1];
};

export default function ThemeSwitcher({ className, text }: Props) {
	const padrao = { light: 'bumblebee', dark: 'dark' };

	const [theme, setTheme] = useState(getCookie('tema') || padrao.light);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === padrao.light ? padrao.dark : padrao.light;
		document.cookie = `tema=${newTheme}; path=/; max-age=31536000`;
		document.documentElement.setAttribute('data-theme', newTheme);
		setTheme(newTheme);
	};

	return (
		<button
			onClick={toggleTheme}
			className={`btn btn-ghost ${className}`}>
			{text ? 'Mudar tema' : ''} {theme === padrao.dark ? <FaMoon size={20} /> : <FaSun size={20} />}
		</button>
	);
}
