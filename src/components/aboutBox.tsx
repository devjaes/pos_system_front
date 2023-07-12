function bloquesNosotros({ titulo, svg }: { titulo: string, svg: any }) {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="flex-1">
                {svg}
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-xl text-center">
                    {titulo}
                </h3>
                <p className='text-center my-4'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ad
                    corporis, deleniti quisquam illo id perferendis nemo harum placeat
                    neque. Ipsum commodi sequi cumque nesciunt ducimus ipsam minus
                    quaerat corporis.
                </p>
            </div>

        </div>
    )
}

export default bloquesNosotros



