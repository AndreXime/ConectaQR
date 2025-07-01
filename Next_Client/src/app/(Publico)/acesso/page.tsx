'use client';

import { useState } from 'react';
import { FaX } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [Errors, setErrors] = useState({ register: [''], login: '' });
    const [Registrando, setRegistrando] = useState(true);

    const handleRegistro = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const nome = String(formData.get('nome')) || '';
        const email = String(formData.get('email')) || '';
        const senha = String(formData.get('senha')) || '';
        const descricao = String(formData.get('descricao')) || '';

        const erros = ['', '', '', ''];

        if (nome.length <= 8) {
            erros[0] = 'O nome deve ter mais de 8 caracteres.';
        }
        if (descricao.length <= 15) {
            erros[3] = 'A descricao deve ter mais de 15 caracteres.';
        }
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            erros[1] = 'O email deve ser válido.';
        }
        if (!(/[A-Z]/.test(senha) && /[a-z]/.test(senha) && /\d/.test(senha))) {
            erros[2] = 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número.';
        }

        if (erros[0] || erros[1] || erros[2] || erros[3]) {
            setErrors({ register: erros, login: Errors.login });
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/registro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ nome, email, senha, descricao }),
            });

            if (!response.ok) {
                setErrors({ register: ['', '', '', '', (await response.json()).message], login: Errors.login });
            } else {
                setErrors({ register: ['', '', '', '', ''], login: '' });
                router.push('/painel');
            }
        } catch {
            setErrors({ register: ['', '', '', '', 'Erro na conexão com o servidor'], login: Errors.login });
        }
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get('email'));
        const senha = String(formData.get('senha'));

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, senha }),
            });

            if (!response.ok) {
                setErrors({ register: Errors.register, login: (await response.json()).message });
            } else {
                router.push('/painel');
            }
        } catch {
            setErrors({ register: Errors.register, login: `Error de conexao no servidor` });
        }
    };

    return (
        <div className="flex flex-col items-center bg-base-100 min-h-dvh py-15">
            {Registrando ? (
                <form
                    key="RegistroForm"
                    onSubmit={handleRegistro}
                    className="flex-col px-6 py-10 lg:p-10 bg-base-100 w-full md:w-1/3 rounded-2xl shadow-2xl"
                >
                    <div className="grid grid-cols-2 gap-2 items-center justify-center w-full mb-5">
                        <button
                            type="button"
                            onClick={() => setRegistrando(true)}
                            className={`btn w-full btn-soft btn-primary ${Registrando ? 'btn-disabled' : ''}`}
                        >
                            Registrar
                        </button>
                        <button
                            type="button"
                            onClick={() => setRegistrando(false)}
                            className={`btn w-full btn-soft btn-primary ${Registrando ? '' : 'btn-disabled'}`}
                        >
                            Login
                        </button>
                    </div>
                    <h1 className="text-2xl font-semibold mb-1">Criar uma nova conta</h1>
                    <p className="text-sm mb-5">Preencha os dados para criar sua conta na plataforma</p>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-base">Nome da sua empresa</legend>
                        <input
                            name="nome"
                            type="text"
                            className="input w-full"
                            placeholder="Digite o nome da empresa"
                        />
                        {Errors.register[0] && <p className="fieldset-label text-error">{Errors.register[0]}</p>}
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-base">Descreva um pouco sobre ela</legend>
                        <input
                            name="descricao"
                            type="text"
                            className="input w-full"
                            placeholder="Crie uma descricao sobre o que é sua empresa"
                        />
                        {Errors.register[3] && <p className="fieldset-label text-error">{Errors.register[3]}</p>}
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-base">Email para login</legend>
                        <input name="email" type="email" className="input w-full" placeholder="Digite seu e-mail" />
                        {Errors.register[1] && <p className="fieldset-label text-error">{Errors.register[1]}</p>}
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-base">Crie uma senha segura</legend>
                        <input
                            name="senha"
                            type="password"
                            className="input w-full"
                            placeholder="Mínimo 8 caracteres, numero, minsculo e maisculo"
                        />
                        {Errors.register[2] && <p className="fieldset-label text-error">{Errors.register[2]}</p>}
                        {Errors.register[4] && (
                            <div role="alert" className="alert alert-error mt-3">
                                <span className="flex-row flex items-center gap-3 font-bold">
                                    <FaX /> {Errors.register[4]}
                                </span>
                            </div>
                        )}
                        <button className="btn btn-primary w-full mt-5" type="submit">
                            Registrar
                        </button>
                    </fieldset>
                </form>
            ) : (
                <form
                    key="LoginForm"
                    onSubmit={handleLogin}
                    className="flex-col px-6 py-10 lg:p-10 bg-base-100 w-full md:w-1/3 rounded-lg shadow-2xl"
                >
                    <div className="grid grid-cols-2 gap-2 items-center justify-center w-full mb-5">
                        <button
                            type="button"
                            onClick={() => setRegistrando(true)}
                            className={`btn w-full btn-soft btn-primary ${Registrando ? 'btn-disabled' : ''}`}
                        >
                            Registrar
                        </button>
                        <button
                            type="button"
                            onClick={() => setRegistrando(false)}
                            className={`btn w-full btn-soft btn-primary ${Registrando ? '' : 'btn-disabled'}`}
                        >
                            Login
                        </button>
                    </div>
                    <h1 className="text-2xl font-semibold mb-1">Entrar na sua conta</h1>
                    <p className="text-sm mb-5">Digite seu email e senha para acessar seu painel administrativo</p>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-base">Email</legend>
                        <input name="email" type="email" className="input w-full" placeholder="Digite seu e-mail" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-base">Senha</legend>
                        <input name="senha" type="password" className="input w-full" placeholder="*********" />
                        {Errors.login && (
                            <div role="alert" className="alert alert-error mt-3">
                                <span className="flex-row flex items-center gap-3 font-bold">
                                    <FaX /> {Errors.login}
                                </span>
                            </div>
                        )}
                        <button className="btn btn-primary w-full mt-5" type="submit">
                            Acessar
                        </button>
                    </fieldset>
                </form>
            )}
        </div>
    );
}
