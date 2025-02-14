'use client';
import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

type Props = {
	className?: string;
};

const getCookie = (name: string) => {
	if (typeof document === 'undefined') return null; // Para SSR
	return document.cookie
		.split('; ')
		.find((row) => row.startsWith(`${name}=`))
		?.split('=')[1];
};

export default function ThemeSwitcher({ className }: Props) {
	const padrao = { light: 'bumblebee', dark: 'dark' };

	const [theme, setTheme] = useState(getCookie('tema') || padrao.light);

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
			{theme === padrao.dark ? <FaMoon size={20} /> : <FaSun size={20} />}
		</button>
	);
}
