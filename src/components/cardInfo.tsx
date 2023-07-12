import React from "react";
import { HiOutlineCreditCard } from "react-icons/hi";
import AccountModal from "./accountModal";
import { useState } from "react";

function InfoCuenta({
  id,
  name,
  number,
  cardType,
  bankName,
  cardHolderName,
  CVV,
  expirationDate,
}: {
  id: number;
  name: string;
  number: string;
  cardType: string;
  bankName?: string;
  cardHolderName: string;
  CVV?: string;
  expirationDate?: string;
}) {
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
          <h1 className="font-bold text-xl ">{name}</h1>
          <h3 className="row-start-2">{number}</h3>
          <p className="text-center font-light">{cardType}</p>
          <div className="flex justify-center row-start-2 row-end-4 col-start-2">
            <HiOutlineCreditCard className="h-full w-4/12" />
          </div>
          <p>{cardHolderName}</p>
        </div>
      </div>
      <div>
        {isOpen && (
          <AccountModal
            closeModal={closeModal}
            client={true}
            card={true}
            id={id}
            name={name}
            number={number}
            type={cardType}
            bankName={bankName}
            cardHolderName={cardHolderName}
            expirationDate={expirationDate}
            code={CVV}
          />
        )}
      </div>
    </>
  );
}

export default InfoCuenta;
