'use client';

import { useState } from 'react';

export default function Page() {
	const [Errors, setErrors] = useState(['', '', '']);
	const [Registrando, setRegistrando] = useState(true);

	const handleRegistro = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const nome = (formData.get('nome') as string) || '';
		const email = (formData.get('email') as string) || '';
		const senha = (formData.get('senha') as string) || '';

		const erros = ['', '', ''];

		if (nome.length <= 8) {
			erros[0] = 'O nome deve ter mais de 8 caracteres.';
		}
		if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
			erros[1] = 'O email deve ser válido.';
		}
		if (!(/[A-Z]/.test(senha) && /[a-z]/.test(senha) && /\d/.test(senha))) {
			erros[2] = 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número.';
		}

		setErrors(erros);
	};

	const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const email = (formData.get('email') as string) || '';
		const senha = (formData.get('senha') as string) || '';

		console.log('Simular login', email, senha);
	};

	return (
		<div className="flex flex-col py-20 items-center bg-gradient-to-t from-blue-500 to-purple-700 min-h-screen">
			{Registrando ? (
				<form
					key="RegistroForm"
					onSubmit={handleRegistro}
					className="flex-col px-6 py-10 lg:p-10 bg-base-100 w-full md:w-1/2 rounded-lg">
					<div className="grid grid-cols-2 gap-2 items-center justify-center w-full mb-5">
						<button
							type="button"
							onClick={() => setRegistrando(true)}
							className={`btn w-full btn-soft btn-primary ${Registrando ? 'btn-disabled' : ''}`}>
							Registrar
						</button>
						<button
							type="button"
							onClick={() => setRegistrando(false)}
							className={`btn w-full btn-soft btn-primary ${Registrando ? '' : 'btn-disabled'}`}>
							Login
						</button>
					</div>
					<h1 className="text-2xl text-center font-semibold mb-5">Cadastra-se na ConnectQR</h1>
					<fieldset className="fieldset">
						<legend className="fieldset-legend text-base">Qual é o nome da sua empresa?</legend>
						<input
							name="nome"
							type="text"
							className="input w-full"
							placeholder="Digite o nome da empresa"
						/>
						{Errors[0] && <p className="fieldset-label text-error">{Errors[0]}</p>}
					</fieldset>
					<fieldset className="fieldset">
						<legend className="fieldset-legend text-base">Qual é o seu e-mail?</legend>
						<input
							name="email"
							type="email"
							className="input w-full"
							placeholder="Digite seu e-mail"
						/>
						{Errors[1] && <p className="fieldset-label text-error">{Errors[1]}</p>}
					</fieldset>
					<fieldset className="fieldset">
						<legend className="fieldset-legend text-base">Crie uma senha segura</legend>
						<input
							name="senha"
							type="password"
							className="input w-full"
							placeholder="Mínimo 8 caracteres, numero, minsculo e maisculo"
						/>
						{Errors[2] && <p className="fieldset-label text-error">{Errors[2]}</p>}
						<button
							className="btn btn-primary w-full mt-5"
							type="submit">
							Registrar
						</button>
					</fieldset>
				</form>
			) : (
				<form
					key="LoginForm"
					onSubmit={handleLogin}
					className="flex-col px-6 py-10 lg:p-10 bg-base-100 w-full md:w-1/2 rounded-lg">
					<div className="grid grid-cols-2 gap-2 items-center justify-center w-full mb-5">
						<button
							type="button"
							onClick={() => setRegistrando(true)}
							className={`btn w-full btn-soft btn-primary ${Registrando ? 'btn-disabled' : ''}`}>
							Registrar
						</button>
						<button
							type="button"
							onClick={() => setRegistrando(false)}
							className={`btn w-full btn-soft btn-primary ${Registrando ? '' : 'btn-disabled'}`}>
							Login
						</button>
					</div>
					<h1 className="text-2xl text-center font-semibold mb-5">Fazer login na ConnectQR</h1>
					<fieldset className="fieldset">
						<legend className="fieldset-legend text-base">Seu e-mail registrado</legend>
						<input
							name="emailLogin"
							type="email"
							className="input w-full"
							placeholder="Digite seu e-mail"
						/>
					</fieldset>
					<fieldset className="fieldset">
						<legend className="fieldset-legend text-base">Sua senha segura</legend>
						<input
							name="senhaLogin"
							type="password"
							className="input w-full"
							placeholder="*********"
						/>
						<button
							className="btn btn-primary w-full mt-5"
							type="submit">
							Acessar
						</button>
					</fieldset>
				</form>
			)}
		</div>
	);
}
