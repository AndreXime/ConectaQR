'use client';
import { Drawer, Resumo, Produtos, Editar, QRCode } from '@/module/Painel/components';
import { useEmpresa } from '@/module/Painel/lib/Context';
import { useEffect } from 'react';
import { BiMenu } from 'react-icons/bi';

export default function App() {
    const { Tab, EmpresaTema, setMobile, mobile } = useEmpresa();

    useEffect(() => {
        document.getElementById('root')?.setAttribute('data-theme', EmpresaTema);
    }, [Tab, EmpresaTema]);

    return (
        <div id="root" data-theme={EmpresaTema} className="flex min-h-screen bg-base-100">
            <Drawer />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-auto p-4 bg-base-200">
                    {!mobile && (
                        <nav className="p-2 bg-base-100 lg:hidden fixed right-2 top-2 z-50 cursor-pointer rounded-4xl">
                            <BiMenu size={29} onClick={() => setMobile(true)} />
                        </nav>
                    )}
                    {Tab === 'Inicio' && <Resumo />}
                    {Tab === 'Editar' && <Editar />}
                    {Tab === 'Produtos' && <Produtos />}
                    {Tab === 'QRCode' && <QRCode />}
                </main>
            </div>
        </div>
    );
}
