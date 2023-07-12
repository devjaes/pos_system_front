import React, { useState } from 'react'
import { HiOutlineLibrary } from "react-icons/hi";
import AccountModal from './accountModal';


function InfoCuenta({ id, name, number, accountType, bankName, accountHolderName, accountHolderDNI, accountHolderEmail, accountPassword }: { id: number, name: string, number: string, accountType: string, bankName: string, accountHolderName: string, accountHolderDNI?: string, accountHolderEmail?: string, accountPassword?: string }) {

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <>
            <div onClick={openModal}>
                <div className="grid grid-cols-2 gap-4 p-4 border-2 border-solid border-gray-800 mt-4 rounded-lg py-6">
                    <h1 className='font-bold text-xl '>{name}</h1>
                    <h3 className='row-start-2'>{number}</h3>
                    <p className="text-center font-light">{accountType}</p>
                    <p >{bankName}</p>
                    <div className="flex justify-center row-start-2 row-end-4 col-start-2">
                        <HiOutlineLibrary className="h-full w-4/12" />
                    </div>
                    <p>{accountHolderName}</p>
                </div>


            </div>
            <div>
                {
                    isOpen && (
                        <AccountModal
                            closeModal={closeModal}
                            card={false}
                            id={id}
                            name={name}
                            number={number}
                            type={accountType}
                            bankName={bankName}
                            accountHolderName={accountHolderName}
                            userDNI={accountHolderDNI}
                            accountHolderEmail={accountHolderEmail}
                            accountPassword={accountPassword}
                        />
                    )
                }
            </div>
        </>

    )
}

export default InfoCuenta