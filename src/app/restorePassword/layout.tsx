"use client"
import '@/app/globals.css'
import Navegador from "@/components/Nav";
import { IOption } from "@/components/Nav";



export default function AdminLayout({ children, }: { children: React.ReactNode }) {

    const options: IOption[] = [{ label: "Inicio", redirect: "/", type: "option" }
    ]
    return (
        <>
            <div>

                <Navegador
                    options={options}
                    imageRedirect="/"
                />
                <h1 className='text-center font-bold text-3xl mt-8'>Reestablecer tu contraseña</h1>
                <main>
                    {children}
                </main>

            </div>
        </>
    )

}