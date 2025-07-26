import Link from 'next/link';
import { useEmpresa } from '../lib/Context';
import { BsBox, BsBuilding, BsPerson, BsQrCode } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { FaStore, FaX } from 'react-icons/fa6';

const navItems = [
    { icon: BsBuilding, label: 'Inicio', Tab: 'Inicio' },
    { icon: BsPerson, label: 'Editar perfil', Tab: 'Editar' },
    { icon: BsBox, label: 'Gerenciar produtos', Tab: 'Produtos' },
    { icon: BsQrCode, label: 'Gerar QRCode', Tab: 'QRCode' },
];
export default function Drawer() {
    const { setTab, EmpresaNome, mobile, setMobile } = useEmpresa();

    return (
        <>
            <div className="hidden lg:block w-56 p-4 bg-base-100 h-screen">
                <div className="flex items-center gap-2 p-4">
                    <span className="font-bold text-xl text-center">ConectaQR</span>
                </div>
                <nav className="space-y-2">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setTab(item.Tab);
                            }}
                            className={`w-full justify-start btn btn-ghost`}
                        >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.label}
                        </button>
                    ))}
                    <Link href={'/' + EmpresaNome} className="w-full justify-start btn btn-ghost">
                        <FaStore className="mr-2 h-4 w-4" />
                        Ver Loja
                    </Link>
                    <button className="w-full btn btn-ghost justify-start">
                        <BiLogOut className="mr-2 h-4 w-4" />
                        Sair
                    </button>
                </nav>
            </div>

            {/* Sidebar overlay para telas pequenas */}
            {mobile && (
                <div className="fixed inset-0 z-50 ">
                    <div
                        className="absolute top-0 right-0 w-[100%] md:w-[50%] h-full bg-white p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center flex-row w-full mb-8">
                            <span className="font-semibold text-lg ml-2">ConectaQR</span>
                            <FaX size={18} onClick={() => setMobile(false)} />
                        </div>
                        <nav className="space-y-2 flex flex-col h-full">
                            {navItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setMobile(false);
                                        setTab(item.Tab);
                                    }}
                                    className={`w-full justify-start btn btn-ghost`}
                                >
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.label}
                                </button>
                            ))}
                            <Link href={'/' + EmpresaNome} className="w-full justify-start btn btn-ghost">
                                <FaStore className="mr-2 h-4 w-4" />
                                Ver Loja
                            </Link>
                            <button className="w-full justify-start btn btn-ghost">
                                <BiLogOut className="mr-2 h-4 w-4" />
                                Sair
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
