import React from "react";
import { IPaymentResponse } from "@/store/types/IPaymentMethods";
import Button from "@/components/Button";

interface IProps {
  closeModal: () => void;
  id?: number;
  name: string;
  amount: number;
  description: string;
  paymentDate: string;
  companyName: string;
  companyRuc: string;
  companyAccountName: string;
  companyAccountNumber: string;
  clientName: string;
  clientDNI: string;
  clientAccountName: string;
  clientAccountNumber: string;
}

export default function paymentModal({
  id,
  name,
  amount,
  description,
  paymentDate,
  companyName,
  companyRuc,
  companyAccountName,
  companyAccountNumber,
  clientName,
  clientDNI,
  clientAccountName,
  clientAccountNumber,
  closeModal,
}: IProps) {
  const formattedPaymentDate = new Date(paymentDate).toLocaleString("es-PE");
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center cursor-default">
      <div className="flex flex-col justify-center items-center bg-white p-5 rounded-lg gap-5 m-auto w-2/6 py-8">
        <h1 className="font-bold  text-center text-xl">Información del pago</h1>
        <div className="flex  w-full justify-evenly">
          <div className=" flex flex-col gap-4">
            <p className="font-bold">Nombre: </p>
            <p className="font-bold">Monto: </p>
            <p className="font-bold">Descripción: </p>
            <p className="font-bold">Fecha de pago: </p>
            <p className="font-bold">Nombre de la empresa: </p>
            <p className="font-bold">RUC de la empresa: </p>
            <p className="font-bold">Cuenta de la empresa: </p>
            <p className="font-bold">Cuenta de la empresa: </p>
            <p className="font-bold">Nombre del cliente: </p>
            <p className="font-bold">DNI del cliente: </p>
            <p className="font-bold">Nombre de la cuenta del cliente: </p>
            <p className="font-bold">Número de cuenta del cliente: </p>
          </div>
          <div className="flex flex-col gap-4">
            <p>{name}</p>
            <p>{amount}</p>
            <p>{description}</p>
            <p>{formattedPaymentDate}</p>
            <p>{companyName}</p>
            <p>{companyRuc}</p>
            <p>{companyAccountName}</p>
            <p>{companyAccountNumber}</p>
            <p>{clientName}</p>
            <p>{clientDNI}</p>
            <p>{clientAccountName}</p>
            <p>{clientAccountNumber}</p>
          </div>
        </div>
        <div className="w-1/2 mt-4">
          <Button texto="Aceptar" onclick={() => closeModal()} />
        </div>
      </div>
    </div>
  );
}
