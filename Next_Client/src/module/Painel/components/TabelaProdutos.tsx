'use client';
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
    flexRender,
    getPaginationRowModel,
    ColumnFiltersState,
} from '@tanstack/react-table';
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Produto } from '@/types/global';
import Image from 'next/image';
import { FaArrowDown, FaArrowLeft, FaArrowRight, FaArrowUp, FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import { useEmpresa } from '../lib/Context';

type Props = {
    fucDeleteProduto: (produtoId: string) => Promise<void>;
    fucEditProduto: Dispatch<SetStateAction<Produto | undefined>>;
};

export default function Tabela({ fucDeleteProduto, fucEditProduto }: Props) {
    const { ProdutosData, Categorias } = useEmpresa();

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const columns: ColumnDef<Produto>[] = [
        {
            accessorKey: 'imagemUrl',
            header: 'Imagem',
            enableSorting: false,
            cell: ({ row }) => (
                <div className="mask h-17 w-20 overflow-hidden flex items-center justify-center">
                    <Image
                        width={300}
                        height={300}
                        src={row.original.imagemUrl}
                        alt={`Imagem do produto ${row.original.nome}`}
                        className="object-contain"
                    />
                </div>
            ),
        },
        {
            accessorKey: 'nome',
            header: 'Nome',
            enableSorting: true,
            enableColumnFilter: true,
            filterFn: 'includesString',
        },
        {
            accessorKey: 'preco',
            header: 'Preço',
            cell: ({ row }) => `R$ ${row.original.preco}`,
            enableSorting: true,
        },
        {
            accessorFn: (row) => row.categoria.nome,
            id: 'categoria',
            header: 'Categoria',
            enableSorting: true,
            enableColumnFilter: true,
            filterFn: 'equals',
        },
        {
            id: 'acoes',
            header: 'Ações',
            cell: ({ row }) => (
                <div className="flex flex-row">
                    <button onClick={() => fucDeleteProduto(row.original.id)} className="btn btn-ghost btn-error mr-2">
                        <FaTrash size={18} />
                    </button>
                    <button
                        onClick={() => {
                            fucEditProduto(row.original);
                            (document.getElementById('modal_edit') as HTMLDialogElement).showModal();
                        }}
                        className="btn btn-ghost btn-info"
                    >
                        <FaEdit size={18} />
                    </button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: ProdutosData,
        columns,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 15,
            },
        },
        state: {
            sorting,
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="w-full">
            {/* Paginação */}
            <div className="grid grid-cols-2 gap-3 py-5 md:px-4">
                <label className="input w-full col-span-full md:col-span-1">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Pesquisar produtos..."
                        value={(table.getColumn('nome')?.getFilterValue() as string) ?? ''}
                        onChange={(e) => table.getColumn('nome')?.setFilterValue(e.target.value)}
                    />
                </label>
                <select
                    className="select select-bordered w-full col-span-full md:col-span-1"
                    value={(table.getColumn('categoria')?.getFilterValue() as string) ?? ''}
                    onChange={(e) => {
                        table.getColumn('categoria')?.setFilterValue(e.target.value || undefined);
                    }}
                >
                    <option value="">Sem filtro de categoria</option>
                    {Categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.nome}>
                            {categoria.nome}
                        </option>
                    ))}
                </select>
                <div className="join col-span-full justify-center">
                    <button
                        className="join-item btn"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <FaArrowLeft />
                    </button>

                    {Array.from({ length: table.getPageCount() }).map((_, index) => (
                        <button
                            key={index}
                            className={`join-item btn  ${
                                index === table.getState().pagination.pageIndex ? 'btn-active' : ''
                            }`}
                            onClick={() => table.setPageIndex(index)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        className="join-item btn "
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>

            {/* Tabela */}
            <div className="overflow-x-auto w-full">
                <table className="table table-zebra min-w-max ">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="cursor-pointer hover:bg-base-200 whitespace-nowrap"
                                    >
                                        <div className="flex items-center gap-2">
                                            {/* Texto do cabeçalho */}
                                            <span className="inline-block">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </span>

                                            {/* Ícone de ordenação */}
                                            <span className="inline-block">
                                                {{
                                                    asc: <FaArrowUp className="text-sm" />,
                                                    desc: <FaArrowDown className="text-sm" />,
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="align-middle">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
