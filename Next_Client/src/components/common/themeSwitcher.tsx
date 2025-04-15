'use client';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

type Props = {
	text?: boolean;
	className?: string;
	initialTheme: string | undefined;
};

const getCookie = (name: string) => {
	return document.cookie
		.split('; ')
		.find((row) => row.startsWith(`${name}=`))
		?.split('=')[1];
};
/*
	É recomendado usar dentro do um server component para ter cookies da requisição e não piscar trocando o tema

	Tambem é recomendado dentro do layout aplicar o tema direto no servidor para não piscar trocando de tema
*/
export default function ThemeSwitcher({ className, text, initialTheme }: Props) {
	const padrao = { light: 'corporate', dark: 'dark' };

	const [theme, setTheme] = useState(initialTheme || padrao.light);

	useEffect(() => {
		setTheme(getCookie('tema') || padrao.light);
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
