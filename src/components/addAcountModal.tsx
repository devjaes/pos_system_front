"use client";

import { HiOutlineCreditCard } from "react-icons/hi";
import { HiOutlineLibrary } from "react-icons/hi";
import Input, { IInputsForm } from "@/components/Input";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import SecondaryButton from "@/components/secondaryButton";
import { set, useForm } from "react-hook-form";
import ComboBox, { BanksComboBox } from "./ComboBox";
import { BankCoopEnum } from "@/store/types/BankEnum";
import { toast } from "react-hot-toast";
import { IPaymentMethodRegister } from "@/store/types/IPaymentMethods";
import { fetchRegisterPaymentMethod } from "@/store/api/cardAccountsApi";
import { useCardAccounts } from "@/context/CardAccountsProvider";

interface ModalProps {
  closeAddAccount: () => void; // Declaración de la función pasada desde el componente padre
}

export default function addAccountModal({ closeAddAccount }: ModalProps) {
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bank, setBank] = useState("");
  const [isBankSelected, setIsBankSelected] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [isAccountTypeSelected, setIsAccountTypeSelected] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [userDNI, setUserDNI] = useState("");
  const { setResearch } = useCardAccounts();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userObj = JSON.parse(user);
      if ("gender" in userObj) {
        setIsClient(true);
        setUserDNI(userObj.dni);
      } else {
        setIsClient(false);
        setUserDNI(userObj.ruc);
      }
    }
  }, []);

  const cardDatas: IInputsForm[] = [
    {
      name: "name",
      label: "Nombre de la tarjeta:",
      type: "text",
      placeholder: "Nombre de la tarjeta",
      alertText: "Nombre de la tarjeta requerido",
    },
    {
      name: "number",
      label: "Número de tarjeta:",
      type: "number",
      placeholder: "Número de tarjeta",
      alertText: "Número de tarjeta requerido",
    },
    {
      name: "holderName",
      label: "Nombre del propietario:",
      type: "text",
      placeholder: "Nombre del propietario",
      alertText: "Nombre del propietario requerido",
    },
    {
      name: "expirationDate",
      label: "Fecha de vencimiento:",
      type: "month",
      placeholder: "Fecha de vencimiento",
      alertText: "Fecha de vencimiento requerida",
    },
    {
      name: "code",
      label: "CVV:",
      type: "text",
      placeholder: "CVV",
      alertText: "CVV requerido",
    },
  ];

  const bankDatasCol1: IInputsForm[] = [
    {
      name: "name",
      label: "Nombre de la cuenta:",
      type: "text",
      placeholder: "Nombre de la cuenta",
      alertText: "Nombre de la cuenta requerido",
    },
    {
      name: "number",
      label: "Número de cuenta:",
      type: "number",
      placeholder: "Número de cuenta",
      alertText: "Número de cuenta requerido",
    },
  ];

  const bankDatasCol2: IInputsForm[] = [
    {
      name: "holderName",
      label: "Nombre del propietario:",
      type: "text",
      placeholder: "Nombre del propietario",
      alertText: "Nombre del propietario requerido",
    },
    {
      name: "accountHolderDNI",
      label: "Cédula del propietario:",
      type: "text",
      placeholder: "Cédula del propietario",
      alertText: "Cédula del propietario requerido",
    },
    {
      name: "accountHolderEmail",
      label: "Email del propietario:",
      type: "text",
      placeholder: "Email del propietario",
      alertText: "Email del propietario requerido",
    },
    {
      name: "code",
      label: "Contraseña de la cuenta:",
      type: "text",
      placeholder: "Contraseña de la cuenta",
      alertText: "Contraseña de la cuenta requerido",
    },
  ];

  const handleBankChange = (bank: string) => {
    setIsBankSelected(true);
    setBank(bank);
  };

  const handleAccountTypeChange = (accountType: string) => {
    setIsAccountTypeSelected(true);
    setAccountType(accountType);
  };

  const onSubmit = handleSubmit((data) => {
    if (paymentMethod === "CARD") {
      if (!isAccountTypeSelected) {
        toast.error("Debe seleccionar un tipo de tarjeta");
        return;
      }
    } else {
      if (!isBankSelected) {
        toast.error("Debe seleccionar un banco");
        return;
      }

      if (!isAccountTypeSelected) {
        toast.error("Debe seleccionar un tipo de cuenta");
        return;
      }
    }
    const paymentMethodData: IPaymentMethodRegister = {
      name: data.name,
      client: isClient,
      card: paymentMethod === "CARD",
      userDNI: userDNI,
      number: data.number as string,
      type: accountType,
      bankName: bank,
      holderName: data.holderName,
      code: data.code,
      expirationDate: data.expirationDate ? data.expirationDate : "",
      accountHolderDNI: data.accountHolderDNI,
      accountHolderEmail: data.accountHolderEmail,
    };

    fetchRegisterPaymentMethod(paymentMethodData)
      .then((res) => {
        if (res) {
          toast.success("Método de pago registrado con éxito");
          //window.location.reload();
          setResearch(true);
          closeAddAccount();
        } else {
          toast.error("Error al registrar método de pago");
        }
      })
      .catch((err) => {
        toast.error("Error al registrar método de pago");
        console.log(err.message);
      });

    console.log(paymentMethodData);
  });

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center ">
        <div className="flex flex-col justify-center items-center bg-white p-5 rounded-lg m-auto">
          {!isOptionSelected && (
            <>
              <h1 className="font-bold text-center text-xl">
                Agregar método de pago
              </h1>
              <div className=" flex gap-8 max-w-screen-md p-4">
                {isClient && (
                  <div
                    className="flex-1 flex flex-col justify-center items-center border-2 border-solid border-gray-300 p-4 rounded-xl cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setIsOptionSelected(true);
                      setPaymentMethod("CARD");
                    }}
                  >
                    <h1 className="font-bold">Agregar una tarjeta</h1>
                    <HiOutlineCreditCard className="h-full w-1/2" />
                    <p className="text-center font-light">
                      Registra una tarjeta a tu cuenta para facilitar tus pagos.
                      Puedes elegir entre una tarjeta de débito o una tarjeta de
                      crédito, según tus necesidades.
                    </p>
                  </div>
                )}
                <div
                  className="flex-1 flex flex-col justify-center items-center border-2 border-solid border-gray-300 p-4 rounded-xl cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setIsOptionSelected(true);
                    setPaymentMethod("BANK");
                  }}
                >
                  <h1 className="font-bold"> Agregar una cuenta bancaria</h1>
                  <HiOutlineLibrary className="h-full w-1/2 " />
                  <p className="text-center font-light">
                    {" "}
                    Registra una cuenta bancaria para administrar tus finanzas
                    de manera eficiente. Puedes seleccionar entre una cuenta
                    corriente o una cuenta de ahorros.
                  </p>
                </div>
              </div>

              <SecondaryButton texto="Cancelar" onclick={closeAddAccount} />
            </>
          )}

          {isOptionSelected && paymentMethod === "BANK" && (
            <>
              <div className="flex gap-2 items-center justify-between flex-col">
                <HiOutlineLibrary className="h-full w-2/12" />
                <h1 className="font-bold text-center text-2xl mb-2">
                  Agregar cuenta bancaria
                </h1>
              </div>

              <form className="flex gap-8 mt-4 items-center justify-center p-4">
                <div className="flex-1 flex flex-col">
                  {bankDatasCol1.map((bankData, index) => (
                    <div className="pb-4 block" key={index}>
                      <label className="block pb-2 "> {bankData.label}</label>
                      <input
                        className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                        type={bankData.type}
                        placeholder={bankData.placeholder}
                        {...register(bankData.name, {
                          required: bankData.alertText,
                        })}
                      />
                      {errors[bankData.name] && (
                        <span className="text-red-500">
                          {bankData.alertText}
                        </span>
                      )}
                    </div>
                  ))}
                  <BanksComboBox
                    label="Banco:"
                    arrayDeOpciones={BankCoopEnum}
                    onChange={handleBankChange}
                    defaultValue="Seleccione un banco"
                  />
                  <ComboBox
                    label="Tipo de cuenta:"
                    options={["CUENTA DE AHORROS", "CUENTA CORRIENTE"]}
                    onChange={handleAccountTypeChange}
                    defaultValue="Seleccione un tipo de cuenta"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  {bankDatasCol2.map((bankData, index) => (
                    <div className="pb-4 block" key={index}>
                      <label className="block pb-2 "> {bankData.label}</label>
                      <input
                        className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                        type={bankData.type}
                        placeholder={bankData.placeholder}
                        {...register(bankData.name, {
                          required: bankData.alertText,
                        })}
                      />
                      {errors[bankData.name] && (
                        <span className="text-red-500">
                          {bankData.alertText}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </form>
              <Button texto="Guardar" onclick={onSubmit} />
              <SecondaryButton
                texto="Cancelar"
                onclick={() => setIsOptionSelected(false)}
              />
            </>
          )}

          {isOptionSelected && paymentMethod === "CARD" && (
            <>
              <div className="flex gap-2 items-center justify-between flex-col">
                <HiOutlineCreditCard className="h-full w-2/12" />
                <h1 className="font-bold text-center text-2xl mb-2">
                  Agregar tarjeta
                </h1>
              </div>
              <form className="flex flex-col w-32rem p-4">
                {cardDatas.map((cardData, index) => (
                  <div className="pb-4 block" key={index}>
                    <label className="block pb-2 "> {cardData.label}</label>
                    <input
                      className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                      type={cardData.type}
                      placeholder={cardData.placeholder}
                      {...register(cardData.name, {
                        required: cardData.alertText,
                      })}
                    />
                    {errors[cardData.name] && (
                      <span className="text-red-500">{cardData.alertText}</span>
                    )}
                  </div>
                ))}
                <div>
                  <ComboBox
                    label="Tipo de tarjeta:"
                    options={["TARJETA DE DEBITO", "TARJETA DE CREDITO"]}
                    onChange={handleAccountTypeChange}
                    defaultValue="Seleccione un tipo de tarjeta"
                  />
                </div>
              </form>
              <Button texto="Guardar" onclick={onSubmit} />
              <SecondaryButton
                texto="Cancelar"
                onclick={() => setIsOptionSelected(false)}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
