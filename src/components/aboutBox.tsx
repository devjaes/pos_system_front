function bloquesNosotros({ titulo, svg, texto }: { titulo: string, svg: any, texto: string }) {
    return (
        <div className='flex flex-col justify-center items-center flex-1'>
            <div className="flex-1">
                {svg}
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-xl text-center">
                    {titulo}
                </h3>
                <p className='text-center my-4'>
                    {texto}
                </p>
            </div>

        </div>
    )
}

export default bloquesNosotros



