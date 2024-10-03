import 'primeicons/primeicons.css';
function BloqueContacto({titulo,icon,texto,reference}: {titulo:string,icon:any,texto:string, reference:string}){
    return(
        <div className="p-4 rounded-lg bg-blue-50 md:p-6 dark:bg-gray-800 hover:scale-110 transform transition-all duration-300">
            <span className="inline-block p-3 text-blue-500 rounded-lg bg-blue-100/80 dark:bg-gray-700">
                <i className={icon} style={{fontSize: "2rem"}}></i>
            </span>
            <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">{titulo}</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{texto}</p>
            <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">{reference}</p>

        </div>
    );

}
export default BloqueContacto;