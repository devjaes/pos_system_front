import Link from "next/link"

function Option({ opcion, redirect = "/" }: { opcion?: string, redirect?: string }) {


    if (opcion !== undefined) {
        return (

            <div className="text-gray-200 font-bold cursor-pointer hover:text-blue-400" >

                <Link href={redirect}>{opcion}</Link>

            </div>

        )
    }
}
export default Option
