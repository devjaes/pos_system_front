import React, { useState } from 'react'
import { IPaymentResponse } from '@/store/types/IPaymentMethods'
import Modal from '@/components/paymentModal'


export default function payment(
    { id, name, amount, description, paymentDate, companyName, companyRuc, companyAccountName, companyAccountNumber, clientName, clientDNI, clientAccountName, clientAccountNumber }: IPaymentResponse
) {
    const formattedPaymentDate = new Date(paymentDate).toLocaleDateString();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className='border-2 border-solid rounded-2xl border-gray-300 p-4 flex gap-4 justify-between' onClick={() => setIsOpen(true)}>
                <div className=''>
                    <h1 className='font-bold text-xl'>{name}</h1>
                    <p>{formattedPaymentDate}</p>
                    <p>{description}</p>
                </div>
                <div className='mr-2 text-m'>
                    <p>$ {amount}</p>
                </div>
            </div>

            {
                isOpen && (
                    <Modal
                        id={id}
                        name={name}
                        amount={amount}
                        description={description}
                        paymentDate={paymentDate}
                        companyName={companyName}
                        companyRuc={companyRuc}
                        companyAccountName={companyAccountName}
                        companyAccountNumber={companyAccountNumber}
                        clientName={clientName}
                        clientDNI={clientDNI}
                        clientAccountName={clientAccountName}
                        clientAccountNumber={clientAccountNumber}
                        closeModal={() => setIsOpen(false)}
                    />
                )
            }

        </>
    )
}
