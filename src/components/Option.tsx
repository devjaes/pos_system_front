import Link from "next/link"

function Option({ opcion, redirect = "/" }: { opcion?: string, redirect?: string }) {


    if (opcion !== undefined) {
        return (

            <div className="text-neutral-50 font-bold cursor-pointer " >

                <Link href={redirect}>{opcion}</Link>

            </div>

        )
    }
}
export default Option
