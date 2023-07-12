import { ICardResponse } from '@/store/types/IPaymentMethods'
import React from 'react'
import { HiOutlineCreditCard } from 'react-icons/hi'
import { HiOutlineLibrary } from 'react-icons/hi'

interface Props {
    id: number;
    name: string;
    number: string;
    cardType?: string;
    cardHolderName?: string;
    cvv?: string;
    expirationDate?: string;
    accountType?: string;
    bankName?: string;
    accountHolderName?: string;
    accountHolderDNI?: string;
    accountHolderEmail?: string;
    accountPassword?: string;
    preferedType: string;
}

export default function preferedAcount({ id, name, number, cardType, cardHolderName, cvv, expirationDate, accountType, bankName, accountHolderName, accountHolderDNI, accountHolderEmail, accountPassword, preferedType }: Props) {
    return (
        <div>
            <h1 className='font-bold text-center text-xl mt-8'>Cuenta de pago preferida</h1>
            {
                preferedType === "card" && (
                    <>

                        <div className="shadow-lg border-2 border-solid border-gray-200 mt-4 rounded-2xl py-4 flex justify-center flex-col w-96">
                            <h1 className="font-bold text-2xl text-center ">{name}</h1>
                            <h3 className="text-center">{number}</h3>

                            <div className="flex justify-center row-start-2 row-end-4 col-start-2">
                                <HiOutlineCreditCard className="h-full w-2/12" />
                            </div>
                            <p className="text-center font-light">{cardType}</p>
                        </div>
                    </>
                )

            }
            {
                preferedType === "bank" && (
                    <>
                        <div className='shadow-lg border-2 border-solid border-gray-200 mt-4 rounded-2xl py-4 flex justify-center flex-col w-96'>
                            <h1 className='font-bold text-xl text-center'>{name}</h1>
                            <h3 className='row-start-2 text-center'>{number}</h3>

                            <div className="flex justify-center row-start-2 row-end-4 col-start-2 my-2">
                                <HiOutlineLibrary className="h-full w-2/12" />
                            </div>
                            <p className='text-center font-light'>{bankName}</p>
                            <p className="text-center font-light ">{accountType}</p>
                        </div>
                    </>

                )
            }

        </div>
    )
}
