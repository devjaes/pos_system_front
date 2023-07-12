import React from 'react'
import Link from 'next/link'

interface IProps {
    texto?: string;
    onclick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
}

function BotonSec({ texto = "botón", onclick = () => { }, disabled = false, type = "button", }: IProps) {

    return (
        <div className='bg-neutral-50 flex justify-center font-bold text-blue-500 rounded-full py-2 w-2/5 cursor-pointer'>
            <button
                className="w-full flex justify-center"
                type={type}
                onClick={onclick}
                disabled={disabled}
            >
                {texto}
            </button>
        </div>
    )
}




export default BotonSec