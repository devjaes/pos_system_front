import React from "react";
import Button from "./Button";
import SecondaryButton from "@/components/secondaryButton";
import { useRouter } from "next/navigation";
import { fetchRegisterPayment } from "@/store/api/paymentApi";
import { toast } from "react-hot-toast";

interface IProps {
  name: string;
  amount: number;
  description: string;
  paymentDate: string;
  companyName: string;
  companyRuc: string;
  companyAccountName: string;
  companyAccountNumber: string;
  clientDNI: string;
  clientName?: string;
}

export default function chargeModal({
  name,
  amount,
  description,
  paymentDate,
  companyName,
  companyRuc,
  companyAccountName,
  companyAccountNumber,
  clientDNI,
  clientName,
}: IProps) {
  const router = useRouter();
  const handleCancel = () => {
    localStorage.removeItem("paymentCreation");
    router.push("/enterprise");
  };

  const handleConfirm = () => {
    fetchRegisterPayment({
      name,
      amount,
      description,
      paymentDate: paymentDate.replaceAll("/", "-"),
      companyName,
      companyRuc,
      companyAccountName,
      companyAccountNumber,
      clientDNI,
    }).then((res) => {
      if (res) {
        if ((res as Response).status === 204) {
          toast.error(
            "El cliente no tiene una cuenta preferida, no tiene cuentas o tarjetas registradas o no tiene saldo suficiente",
            { duration: 5000 }
          );
        } else {
          toast.success("Pago registrado");
          router.push("/enterprise");
        }
      } else {
        toast.error("Error al registrar el pago");
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex">
      <div className="flex flex-col bg-white p-8 rounded-lg gap-5 m-auto w-1/4 ">
        <h1 className="font-bold text-3xl text-center">Confirmar pago</h1>
        <h2 className="font-bold font-2xl text-start">
          Información del cobro:{" "}
        </h2>
        <div className="flex gap-4">
          <div className="font-bold">
            <p className="text-start">Nombre:</p>
            <p className="text-start">Monto:</p>
            <p className="text-start">Descripción:</p>
            <p className="text-start">Fecha de pago:</p>
          </div>
          <div>
            <p>{name}</p>
            <p>{amount}</p>
            <p>{description}</p>
            <p>{paymentDate}</p>
          </div>
        </div>
        <h2 className="font-bold font-2xl text-start">
          Informacion de la empresa:{" "}
        </h2>
        <div className="flex gap-4">
          <div className="font-bold">
            <p>Empresa: </p>
            <p>RUC:</p>
            <p>Cuenta de cobro: </p>
            <p>numero de cuenta: </p>
          </div>
          <div>
            <p>{companyName}</p>
            <p>{companyRuc}</p>
            <p>{companyAccountName} </p>
            <p>{companyAccountNumber}</p>
          </div>
        </div>
        <h2 className="font-bold font-2xl text-start">
          Información del cliente:{" "}
        </h2>
        <div className="flex gap-4">
          <div className="font-bold">
            <p className="text-start">Cliente:</p>
            <p className="text-start">DNI: </p>
          </div>
          <div>
            <p>{clientName}</p>
            <p>{clientDNI}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <Button texto="Confirmar" onclick={handleConfirm} />
          <SecondaryButton texto="Cancelar" onclick={handleCancel} />
        </div>
      </div>
    </div>
  );
}
