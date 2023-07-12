import React from 'react'
import { HiOutlinePlusCircle } from "react-icons/hi";


function AgregarCuenta() {
    return (
        <div >
            <div className="p-4 border-2 border-solid border-gray-800 mt-4 rounded-lg py-6 ">
                <div className="flex justify-center">
                    <HiOutlinePlusCircle className=" h-12   w-4/12" />
                </div>
            </div>
        </div>
    )
}

export default AgregarCuenta