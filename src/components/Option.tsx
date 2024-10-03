import Link from "next/link"

function Option({ opcion, redirect = "/" }: { opcion?: string, redirect?: string }) {


    if (opcion !== undefined) {
        return (
            <Link href={redirect} className="h-full flex items-center justify-center group ">
                <div className="text-gray-200 font-bold cursor-pointer group-hover:text-blue-400 " >
                    {opcion}
                </div>
            </Link>
        )
    }
}
export default Option
