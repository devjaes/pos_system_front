import 'primeicons/primeicons.css';
function bloquesNosotros({ titulo, icon, texto }: { titulo: string, icon: any, texto: string }) {
    return (
        <div className='border-2 border-slate-800 p-6 rounded-md border-solid flex flex-col justify-center items-center flex-1'>
            <div className="flex-1 p-1">
             <i className={icon} style={{fontSize: "2rem"}}></i>
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-xl text-center ">
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



