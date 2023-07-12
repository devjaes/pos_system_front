import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import {
  IBankCoopAccountResponse,
  IPartPaymentCreation,
} from "@/store/types/IPaymentMethods";
import { useCardAccounts } from "@/context/CardAccountsProvider";
import { toast } from "react-hot-toast";
import { AccountsComboBox } from "./ComboBox";
import { useRouter } from "next/navigation";

interface IProps {
  closeModal: () => void;
}

export default function RegisterPaymentModal({ closeModal }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { cAccounts, sAccounts, preferedAccount } = useCardAccounts();
  const amountInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (cAccounts.length === 0 && sAccounts.length === 0) {
    toast.error("No tienes cuentas registradas");
    closeModal();
  }

  const accounts = [...cAccounts, ...sAccounts];

  const [accoutToCollect, setAccountToCollect] = useState<
    IBankCoopAccountResponse | undefined
  >(undefined);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isValidAmount, setIsValidAmount] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

  const handleAccountToCollect = (account: IBankCoopAccountResponse) => {
    setAccountToCollect(account);
  };

  const onSubmit = handleSubmit((data) => {
    console.log("data: ", data);
    console.log("accountToCollect: ", accoutToCollect);
    if (!accoutToCollect) {
      toast.error("Debe seleccionar una cuenta para recibir el pago");
      return;
    }

    if (!isValidAmount) {
      toast.error("Debe ingresar un monto válido");
      return;
    }
    toast.loading("Procederemos al cobro mediante reconocimiento facial", {
      duration: 3000,
    });

    const paymentCreation: IPartPaymentCreation = {
      name: data.name,
      amount: amount,
      description: data.description,
      companyAccountName: accoutToCollect.name,
      companyAccountNumber: accoutToCollect.number,
    };

    localStorage.setItem("paymentCreation", JSON.stringify(paymentCreation));

    router.push(`/enterprise/payment`);
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const regex = /^\d+(\.\d{1,2})?$/;

    if (!regex.test(inputValue)) {
      setIsValidAmount(false);
      // El valor ingresado no cumple con el formato deseado
      // Corregir el valor automáticamente
      const correctedValue = parseFloat(inputValue).toFixed(2);
      if (amountInputRef.current) {
        amountInputRef.current.value = correctedValue;
        setIsValidAmount(true);
        setAmount(parseFloat(correctedValue));
      }
    }
    if (regex.test(inputValue)) {
      setIsValidAmount(true);
      setAmount(parseFloat(inputValue));
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setAccountToCollect(preferedAccount as IBankCoopAccountResponse);
      setIsChecked(true);
    } else {
      setAccountToCollect(undefined);
      setIsChecked(false);
    }
  };

  return (
    <form className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center">
      <div className="flex flex-col justify-center items-center bg-white p-5 rounded-lg gap-5 m-auto w-2/6 py-8">
        <h1 className="font-bold  text-center text-xl">Información del pago</h1>
        <div className="flex flex-col w-full justify-evenly">
          <div className="pb-4 block">
            <label className="block pb-2 "> Nombre del cobro: </label>
            <input
              className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
              type="text"
              placeholder="Nombre del cobro"
              {...register("name", {
                required: "Nombre del cobro requerido",
              })}
            />
            {errors.name && (
              <span className="text-red-500">Nombre del cobro requerido</span>
            )}
          </div>
          <div className="pb-4 block">
            <label className="block pb-2 "> Descripción del cobro: </label>
            <input
              className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
              type="text"
              placeholder="Descripción del cobro"
              {...register("description", {
                required: "Descripción del cobro requerido",
              })}
            />
            {errors.description && (
              <span className="text-red-500">
                Descripción del cobro requerido
              </span>
            )}
          </div>
          <div className="pb-4 block">
            <label className="block pb-2 "> Monto a cobrar: </label>
            <div className="flex justify-start">
              <input
                ref={amountInputRef}
                className="border border-solid border-gray-300 py-2 px-4 rounded-full w-2/5"
                type="number"
                step="0.01"
                onInput={handleInputChange}
                pattern="^[0-9]+(\.[0-9]{1,2})?$"
                placeholder="Monto a cobrar"
                onChange={handleInputChange}
              />
              <span className="flex items-center px-2">USD</span>
            </div>
          </div>
          <div className="pb-4 block">
            {preferedAccount && (
              <div>
                {!isChecked && (
                  <>
                    <div className="flex ">
                      <AccountsComboBox
                        label="Seleccione una cuenta para realizar el cobro:"
                        arrayDeOpciones={accounts}
                        onChange={handleAccountToCollect}
                      ></AccountsComboBox>
                    </div>
                    {accoutToCollect == undefined && (
                      <span className="text-red-500">
                        Debe seleccionar una cuenta
                      </span>
                    )}
                  </>
                )}

                <div className="flex  items-center py-4 gap-4">
                  <input
                    className="border-2 border-solid border-gray-300  rounded-full w-6 h-6"
                    type="checkbox"
                    checked={preferedAccount === accoutToCollect}
                    onChange={handleCheck}
                  ></input>

                  <label>
                    Utilizar tu cuenta predeterminada para realizar el cobro{" "}
                  </label>
                </div>
              </div>
            )}
            {preferedAccount == undefined && (
              <div>
                <div className="flex ">
                  <AccountsComboBox
                    label="Seleccione una cuenta para realizar el cobro:"
                    arrayDeOpciones={accounts}
                    onChange={handleAccountToCollect}
                  ></AccountsComboBox>
                </div>
                {accoutToCollect == undefined && (
                  <span className="text-red-500">
                    Debe seleccionar un cuenta
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-4 w-full">
          <Button texto="Cancelar" onclick={() => closeModal()} />
          <Button texto="Continuar" type="submit" onclick={onSubmit} />
        </div>
      </div>
    </form>
  );
}
