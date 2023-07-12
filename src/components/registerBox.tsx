"use client"
import React from 'react'
import Button from './Button';
import Link from 'next/link';

function bloqueRegistro({ titulo, arrayDeDatos, img, redirect = "/" }: { titulo: string, arrayDeDatos: string[], img: { src: string }, redirect?: string }) {

    const beneficios =
        arrayDeDatos.map((dato, index) => (
            <li key={index} className="list-disc">{dato}</li>
        ))


    return (
        <div className="registro sombra flex-1 flex flex-col shadow-lg rounded-lg ">
            <img className="rounded-lg" src={img.src} alt="imagenRegistro" />
            <div className="flex flex-col items-center ">
                <h1 className="font-bold text-xl my-4 ">{titulo}</h1>
                <div className="w-2/4">
                    <Link href={redirect}>
                        <Button texto="Registrate" onclick={() => { }} />
                    </Link>
                </div>
                <ul className="my-8">

                    {beneficios}

                </ul>

            </div>
        </div>
    )
}

export default bloqueRegistro