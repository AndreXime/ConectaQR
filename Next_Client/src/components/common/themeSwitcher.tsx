'use client';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

type Props = {
	className?: string;
};

export default function ThemeSwitcher({ className }: Props) {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') || 'light';
		setTheme(savedTheme);
		document.documentElement.setAttribute('data-theme', savedTheme);
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	};

	return (
		<button
			onClick={toggleTheme}
			className={`btn btn-ghost ${className}`}>
			{theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
		</button>
	);
}
