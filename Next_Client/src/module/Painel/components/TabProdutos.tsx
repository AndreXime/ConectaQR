import { useState } from 'react';
import { FaMoneyBill, FaSave, FaTrash, FaUpload } from 'react-icons/fa';
import type { Produto, Categoria } from '@/types/global';
import { Tabela } from './index';
import { useEmpresa } from '../lib/Context';
import Popup, { MessageType } from '../ui/Popup';
import { FiTag, FiPlus, FiEdit, FiPackage } from 'react-icons/fi';
import Image from 'next/image';
import { FaBox } from 'react-icons/fa6';

export default function Produtos() {
    const { setProdutosData, Categorias, setCategorias } = useEmpresa();
    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
    const [EditandoProduto, setEditandoProduto] = useState<Produto>();
    const [EditandoCategoria, setEditandoCategoria] = useState<Categoria>();
    const [Carregando, setCarregando] = useState(false);
    const [messages, setMessages] = useState<MessageType[]>([]);

    const addMessage = (msg: string, status: 'success' | 'error') => {
        setMessages((prev) => [...prev, { id: Date.now(), text: msg, status: status }]);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setImagePreview(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCategoriaSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const nome = String(formData.get('categoria'));

        if (nome.length === 0) {
            addMessage('Nenhum nome foi fornecido', 'error');
            return;
        }

        setCarregando(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ nome }),
            });
            const { message, data } = await response.json();
            setCarregando(false);

            if (!response.ok) {
                addMessage('Erro no servidor: ' + message, 'error');
            } else {
                addMessage('Categoria salva com sucesso: ', 'success');
                setCategorias((prevItems) => [...prevItems, data]);
                form.reset();
            }
        } catch (err) {
            addMessage('Erro no cliente: ' + err, 'error');
        }
    };

    const handleCategoriaUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const nome = String(formData.get('nome'));
        const categoriaId = String(formData.get('categoriaId'));

        if (nome.length === 0 || !categoriaId) {
            addMessage('Um campo não foi fornecido', 'error');
            return;
        }

        setCarregando(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ nome, categoriaId }),
            });
            const { message, data } = await response.json();
            setCarregando(false);

            if (!response.ok) {
                addMessage('Erro no servidor: ' + message, 'error');
            } else {
                addMessage('Categoria atualizada com sucesso!', 'success');
                setCategorias((prev) => prev.map((categoria) => (categoria.id === data.id ? { ...data } : categoria)));
                setEditandoCategoria(data);
                form.reset();
            }
        } catch (err) {
            addMessage('Erro no cliente: ' + err, 'error');
        }
    };

    const handleCategoriaDelete = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const id = String(formData.get('categoriaId'));
        const newId = String(formData.get('newId'));

        if (id == newId) {
            addMessage('Você está usando a mesma categoria que deseja apagar', 'error');
            return;
        }

        setCarregando(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id, newId }),
            });

            const { message } = await response.json();

            if (!response.ok) {
                addMessage(message, 'error');
            } else {
                addMessage('Categoria deletada com sucesso!', 'success');
                setCategorias((prev) => prev.filter((categoria) => categoria.id !== id));
                const categoriaNova = Categorias.find((categoria) => categoria.id === newId);
                const categoriaDeletada = Categorias.find((categoria) => categoria.id === id);

                setProdutosData((prev) =>
                    prev.map((product) =>
                        product.categoria.nome === categoriaDeletada!.nome
                            ? { ...product, categoria: { nome: categoriaNova!.nome } }
                            : product
                    )
                );
                form.reset();
            }
        } catch (err) {
            addMessage('Erro interno no servidor: ' + err, 'error');
        }
        setCarregando(false);
    };

    const handleProdutoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const nome = String(formData.get('nome'));
        const preco = String(formData.get('preco'));
        const categoria = String(formData.get('categoria'));
        const imagem = formData.get('imagem') as File;

        if (!nome || !preco || !categoria || !imagem) {
            addMessage('Um campo não foi fornecido', 'error');
            return;
        }
        setCarregando(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produto`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            const { message, data } = await response.json();
            setCarregando(false);
            if (!response.ok) {
                addMessage(message, 'error');
            } else {
                addMessage('Produto salvo com sucesso!', 'success');
                setProdutosData((prevItems) => [...prevItems, data]);
                setImagePreview(undefined);
                form.reset();
            }
        } catch (err) {
            addMessage('Erro interno no servidor: ' + err, 'error');
        }
    };

    const handleProdutoUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        if (imagePreview) {
            formData.append('imagem', imagePreview);
        }

        setCarregando(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produto`, {
                method: 'PATCH',
                credentials: 'include',
                body: formData,
            });

            const { message, data } = await response.json();
            setCarregando(false);

            if (!response.ok) {
                addMessage(message, 'error');
            } else {
                addMessage('Produto atualizado com sucesso!', 'success');
                setProdutosData((prev) => prev.map((product) => (product.id === data.id ? { ...data } : product)));
                setEditandoProduto(data);
                setImagePreview(undefined);
                form.reset();
            }
        } catch (err) {
            addMessage('Erro interno no servidor: ' + err, 'error');
        }
    };

    const handleProdutoDelete = async (produtoId: string) => {
        setCarregando(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/produto/${produtoId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            const { message } = await response.json();
            setCarregando(false);

            if (!response.ok) {
                addMessage(message, 'error');
            } else {
                addMessage('Produto deletado com sucesso!', 'success');
                setProdutosData((prev) => prev.filter((product) => product.id !== produtoId));
            }
        } catch (err) {
            addMessage('Erro interno no servidor: ' + err, 'error');
        }
    };

    return (
        <div className="space-y-6 p-4">
            <div>
                <h2 className="text-3xl font-bold">Gerenciar Produtos</h2>
                <p className="text-gray-500">Adicione, edite e remova categorias e produtos da sua loja.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Gerenciar Categorias */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div>
                            <h2 className="card-title flex items-center">
                                <FiTag className="mr-2 h-5 w-5" /> Categorias
                            </h2>
                            <p className="text-gray-500">Gerencie as categorias de produtos da sua loja.</p>
                        </div>

                        <div className="space-y-4 mt-4">
                            <form onSubmit={handleCategoriaSubmit} className="flex space-x-2">
                                <input
                                    type="text"
                                    name="categoria"
                                    placeholder="Nome da nova categoria"
                                    className="input input-bordered flex-1"
                                />
                                <button type="submit" className="btn btn-primary">
                                    <FiPlus className="mr-2 h-4 w-4" />
                                    Adicionar
                                </button>
                            </form>

                            <div className="space-y-2 overflow-scroll max-h-90">
                                {Categorias.map((categoria) => (
                                    <div
                                        key={categoria.id}
                                        className="flex items-center justify-between p-3 border rounded-md"
                                    >
                                        <span>{categoria.nome}</span>
                                        <div className="flex space-x-2">
                                            <button className="btn btn-outline btn-xs">
                                                <FiEdit
                                                    className="h-4 w-4"
                                                    color="blue"
                                                    onClick={() => {
                                                        setEditandoCategoria(categoria);
                                                        (
                                                            document.getElementById(
                                                                'modal_editCategoria'
                                                            )! as HTMLDialogElement
                                                        ).showModal();
                                                    }}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Adicionar Produto */}
                <div className="card bg-base-100 shadow-xl">
                    <form onSubmit={handleProdutoSubmit} encType="multipart/form-data" className="card-body">
                        <h2 className="card-title flex items-center">
                            <FiPackage className="mr-2 h-5 w-5" /> Adicionar Produto
                        </h2>
                        <p className="text-gray-500">Adicione um novo produto à sua loja.</p>

                        <div className="space-y-4 mt-4">
                            <div className="flex items-center gap-4">
                                <div className="avatar">
                                    <div className="w-20 rounded">
                                        <Image
                                            src={imagePreview || '/assets/blankphoto.png'}
                                            alt="Avatar"
                                            width={400}
                                            height={400}
                                            className=" w-full h-full"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <input
                                        name="imagem"
                                        id="imagem"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="imagem" className="btn btn-outline mb-2">
                                        <FaUpload className="mr-2 h-4 w-4" />
                                        Envie uma imagem
                                    </label>

                                    <p className="text-xs text-gray-500 text-center">Tamanho máximo de 3MB.</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="label">Nome do Produto</label>
                                <div>
                                    <label className="input w-full">
                                        <FaBox size={18} className="text-primary" />
                                        <input
                                            id="nome"
                                            name="nome"
                                            type="text"
                                            placeholder="Ex: Água"
                                            className="grow"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="label">Preço</label>
                                <div>
                                    <label className="input w-full">
                                        <FaMoneyBill size={18} className="text-primary" />
                                        <input
                                            id="preco"
                                            name="preco"
                                            type="text"
                                            placeholder="Ex: R$ 10,00"
                                            className="grow"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="label">Categoria</label>
                                <div>
                                    <select name="categoriaId" className="select select-bordered w-full">
                                        <option value="">Selecione uma categoria</option>
                                        {Categorias.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="card-actions mt-3">
                            <button type="submit" className="btn btn-primary w-full">
                                <FiPlus className="mr-2 h-4 w-4" />
                                Adicionar Produto
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Lista de Produtos */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title flex items-center">
                        <FiPackage className="mr-2 h-5 w-5" /> Produtos Cadastrados
                    </h2>
                    <p className="text-gray-500">Gerencie os produtos da sua loja.</p>
                    <p className="text-gray-500">Clique em um campo da tabela para ver em ordem alfabetica</p>

                    <Tabela fucDeleteProduto={handleProdutoDelete} fucEditProduto={setEditandoProduto} />
                    <Popup messages={messages} setMessages={setMessages} />
                </div>
            </div>

            <dialog id={'modal_edit'} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Editando um produto</h3>
                    {EditandoProduto && (
                        <div className="py-4">
                            <form
                                onSubmit={handleProdutoUpdate}
                                encType="multipart/form-data"
                                className="flex flex-col gap-4 mx-2"
                            >
                                <input name="produtoId" value={EditandoProduto.id} className="hidden" readOnly />
                                <label htmlFor="fileUpload" className="btn btn-outline">
                                    <Image
                                        src={imagePreview || '/assets/blankphoto.png'}
                                        alt="Avatar"
                                        width={250}
                                        height={250}
                                        className=" w-full h-full"
                                    />
                                    <input
                                        name="imagem"
                                        id="fileUpload"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>

                                <label className="floating-label flex-grow-1">
                                    <span>Nome do produto</span>
                                    <input
                                        name="nome"
                                        defaultValue={EditandoProduto.nome}
                                        type="text"
                                        className="input w-full"
                                    />
                                </label>

                                <label className="floating-label flex-grow-1">
                                    <span>Preço</span>
                                    <input
                                        name="preco"
                                        defaultValue={EditandoProduto.preco}
                                        type="number"
                                        className="input w-full"
                                    />
                                </label>

                                <label className="floating-label flex-grow-1">
                                    <span>Categoria</span>
                                    <select
                                        name="categoriaId"
                                        defaultValue={EditandoProduto.categoria.nome}
                                        className="select w-full"
                                    >
                                        <option disabled>Selecione categoria</option>
                                        {Categorias.map((value) => (
                                            <option value={value.id} key={value.nome}>
                                                {value.nome}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                {Carregando ? (
                                    <button type="submit" disabled className="btn btn-success">
                                        <span className="loading loading-spinner loading-lg"></span>
                                    </button>
                                ) : (
                                    <button type="submit" className="btn btn-success">
                                        <FaSave /> Salvar
                                    </button>
                                )}
                            </form>
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-accent">Fechar</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id={'modal_editCategoria'} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Editando uma categoria</h3>
                    {EditandoCategoria && (
                        <div className="py-4">
                            <form onSubmit={handleCategoriaUpdate} className="flex flex-col gap-4 mx-2">
                                <input name="categoriaId" value={EditandoCategoria.id} className="hidden" readOnly />

                                <label className="floating-label flex-grow-1">
                                    <span>Nome da categoria</span>
                                    <input
                                        name="nome"
                                        defaultValue={EditandoCategoria.nome}
                                        type="text"
                                        className="input w-full"
                                    />
                                </label>

                                {Carregando ? (
                                    <button type="submit" disabled className="btn btn-success">
                                        <span className="loading loading-spinner loading-lg"></span>
                                    </button>
                                ) : (
                                    <button type="submit" className="btn btn-success">
                                        <FaSave /> Salvar
                                    </button>
                                )}
                            </form>
                            <form onSubmit={handleCategoriaDelete} className="flex flex-col gap-4 mx-2 mt-3">
                                <p>Escolha outra categoria para mover os produtos antes de excluir esta</p>
                                <input name="categoriaId" value={EditandoCategoria.id} className="hidden" readOnly />
                                <label className="floating-label flex-grow-1">
                                    <span>Categoria</span>
                                    <select
                                        name="newId"
                                        defaultValue={EditandoCategoria.nome}
                                        className="select w-full"
                                    >
                                        <option disabled>Selecione categoria</option>
                                        {Categorias.map((value) => (
                                            <option value={value.id} key={value.nome}>
                                                {value.nome}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                {Carregando ? (
                                    <button type="button" disabled className="btn btn-error">
                                        <span className="loading loading-spinner loading-lg"></span>
                                    </button>
                                ) : (
                                    <button type="submit" className="btn btn-error">
                                        <FaTrash /> Excluir
                                    </button>
                                )}
                            </form>
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-accent">Fechar</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
/*
		<div>
			<div className="collapse collapse-arrow bg-primary text-primary-content border border-base-300 mb-8">
				<input type="checkbox" />
				<div className="collapse-title font-semibold">Adicionar categorias</div>
				<div className="collapse-content grid grid-cols-1 gap-4 mx-1">
					<form
						onSubmit={handleCategoriaSubmit}
						className="flex flex-col md:flex-row gap-4 text-black">
						<label className="input w-full md:w-1/2">
							<span className="label">Nome da categoria</span>
							<input
								name="categoria"
								type="text"
							/>
						</label>

						{Carregando ? (
							<button
								type="submit"
								disabled
								className="btn btn-success">
								<span className="loading loading-spinner loading-lg"></span>
							</button>
						) : (
							<button
								type="submit"
								className="btn btn-success">
								<FaSave /> Salvar
							</button>
						)}
					</form>
				</div>
			</div>
			<div className="collapse collapse-arrow bg-primary text-primary-content border border-base-300 mb-8">
				<input type="checkbox" />
				<div className="collapse-title font-semibold">Adicionar produto</div>
				<form
					onSubmit={handleProdutoSubmit}
					encType="multipart/form-data"
					className="collapse-content flex flex-col md:flex-row gap-4 mx-2">
					<label
						htmlFor="fileUpload"
						className="btn btn-outline">
						<FaUpload />
						{file ? file.name : 'Escolha um arquivo'}
						<input
							name="imagem"
							id="fileUpload"
							type="file"
							className="hidden"
							onChange={handleFileChange}
						/>
					</label>

					<label className="floating-label flex-grow-1 text-black">
						<span>Nome do produto</span>
						<input
							name="nome"
							type="text"
							className="input w-full"
						/>
					</label>

					<label className="floating-label flex-grow-1 text-black">
						<span>Preço</span>
						<input
							name="preco"
							type="number"
							className="input w-full"
						/>
					</label>

					<label className="floating-label flex-grow-1 text-black">
						<span>Categoria</span>
						<select
							name="categoriaId"
							defaultValue="Selecione tags"
							className="select">
							<option disabled>Selecione categoria</option>
							{Categorias.map((value) => (
								<option
									value={value.id}
									key={value.nome}>
									{value.nome}
								</option>
							))}
						</select>
					</label>

					{Carregando ? (
						<button
							type="submit"
							disabled
							className="btn btn-success">
							<span className="loading loading-spinner loading-lg"></span>
						</button>
					) : (
						<button
							type="submit"
							className="btn btn-success">
							<FaSave /> Salvar
						</button>
					)}
				</form>
			</div>
				
*/
