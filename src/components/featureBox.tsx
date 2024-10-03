import React from 'react'
import 'primeicons/primeicons.css';

export default function featureBox({texto,icon}: {texto:string,icon:any}) {
  return (
    <div>
       <div className="flex hover:scale-110 transform transition-all duration-300 p-4 rounded-lg bg-blue-50 md:p-6 dark:bg-gray-800">
            <span className="justify-center border-slate-800 inline-block p-4 text-blue-500 rounded-lg bg-blue-100/80 dark:bg-gray-700">
                <i className={icon} style={{fontSize: "4rem"}}></i>
            </span>
            <p className="p-3 font-semibold mt-2 text-base  text-gray-500 dark:text-gray-400">{texto}</p>
        </div>
    </div>
  )
}
