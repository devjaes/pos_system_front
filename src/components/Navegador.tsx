import React from 'react'
import IconClipboard from './svg/IconIconClipboard'
import Link from 'next/link'

function Navegador() {
    return (

        <div>


            <nav x-data="{ isOpen: false }" className="relative bg-white shadow dark:bg-gray-800">
                <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
                    <div className="flex items-center justify-between items-center">
                        <Link className="flex gap-x-4" href='/Sexo'>
                            <h1 className='text-gray-200 flex gap-x-4 justify-center cursor-pointer' ><IconClipboard className="w-8 h-8 text-blue-500" />My pos system</h1>
                        </Link>




                    </div>

                    <div x-cloak="true" className="[isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full'] inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center">
                        <div className="flex flex-col md:flex-row md:mx-6">
                            <Link href="/login">
                                <p className="cursor-pointer my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" >Ingresar</p>
                            </Link>
                            <Link href="/login">
                                <p className="cursor-pointer my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" >Contacto</p>
                            </Link>
                            <Link href="/login">
                                <p className="cursor-pointer my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" >Sobre Nosotros</p>
                            </Link>
                        </div>


                    </div>
                </div>
            </nav>

        </div>
    )


}

export default Navegador