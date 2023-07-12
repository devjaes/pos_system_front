import { HiOutlineCreditCard } from "react-icons/hi";
import { IInputsForm } from "@/components/Input";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import SecondaryButton from "@/components/secondaryButton";
import { HiOutlineLibrary } from "react-icons/hi";
import { useForm } from "react-hook-form";
import {
  IBankCoopAccountResponse,
  ICardResponse,
} from "@/store/types/IPaymentMethods";
import {
  fetchDeleteAccount,
  fetchDeleteCard,
  fetchUpdateAccount,
  fetchUpdateCard,
} from "@/store/api/cardAccountsApi";
import { toast } from "react-hot-toast";
import { useCardAccounts } from "@/context/CardAccountsProvider";
import ComboBox, { BanksComboBox } from "./ComboBox";
import { BankCoopEnum } from "@/store/types/BankEnum";
import {
  fetchSetPreferedPaymentClient,
  fetchSetPreferedPaymentCompany,
} from "@/store/api/userApi";
import {
  TClientsResponse,
  TEnterpriseResponse,
} from "@/store/types/IUserResponses";
import { useRouter } from "next/navigation";

interface ModalProps {
  closeModal: () => void; // Declaración de la función pasada desde el componente padre
  id: number;
  name?: string;
  client?: boolean;
  card?: boolean;
  userDNI?: string;
  number?: string;
  type?: string;
  bankName?: string;
  cardHolderName?: string;
  code?: string;
  expirationDate?: string;
  accountHolderName?: string;
  accountHolderEmail?: string;
  accountPassword?: string;
}

export default function accountModal({
  closeModal,
  id,
  name,
  client,
  card,
  userDNI,
  number,
  type,
  bankName,
  cardHolderName,
  code,
  expirationDate,
  accountHolderName,
  accountHolderEmail,
  accountPassword,
}: ModalProps) {
  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [cvvTextType, setCvvTextType] = useState("password");
  const [bank, setBank] = useState("");
  const [isBankSelected, setIsBankSelected] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [isAccountTypeSelected, setIsAccountTypeSelected] = useState(false);
  const [user, setUser] = useState<TClientsResponse | TEnterpriseResponse>();

  const handleModificarClick = () => {
    setInputsDisabled(false);
    setShowSaveButton(true);
    setCvvTextType("number");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const cardDatas: IInputsForm[] = [
    {
      name: "name",
      label: "Nombre de la tarjeta:",
      type: "text",
      placeholder: "Nombre de la tarjeta",
      alertText: "Nombre de la tarjeta requerido",
      value: name,
      disabled: inputsDisabled,
    },
    {
      name: "number",
      label: "Número de tarjeta:",
      type: "number",
      placeholder: "Número de tarjeta",
      alertText: "El número de tarjeta debe tener entre 16 y 19 caracteres",
      value: number,
      disabled: inputsDisabled,
    },
    {
      name: "cardHolderName",
      label: "Nombre del propietario:",
      type: "text",
      placeholder: "Nombre del propietario",
      alertText: "Nombre del propietario requerido",
      value: cardHolderName,
      disabled: inputsDisabled,
    },
    {
      name: "expirationDate",
      label: "Fecha de vencimiento:",
      type: "month",
      placeholder: "Fecha de vencimiento",
      alertText: "Fecha de vencimiento requerida",
      value: expirationDate,
      disabled: inputsDisabled,
    },
    {
      name: "code",
      label: "CVV:",
      type: cvvTextType,
      placeholder: "CVV",
      alertText: 'El CVV debe tener entre 3 y 4 caracteres',
      value: code,
      disabled: inputsDisabled,
    },
  ];

  const bankDatasCol1: IInputsForm[] = [
    {
      name: "name",
      label: "Nombre de la cuenta:",
      type: "text",
      placeholder: "Nombre de la cuenta",
      alertText: "Nombre de la cuenta requerido",
      value: name,
      disabled: inputsDisabled,
    },
    {
      name: "number",
      label: "Número de cuenta:",
      type: "number",
      placeholder: "Número de cuenta",
      alertText: "El número de cuenta debe tener entre 20 y 24 caracteres",
      value: number,
      disabled: inputsDisabled,
    },
  ];

  const bankDatasCol2: IInputsForm[] = [
    {
      name: "accountHolderName",
      label: "Nombre del propietario:",
      type: "text",
      placeholder: "Nombre del propietario",
      alertText: "Nombre del propietario requerido",
      value: accountHolderName,
      disabled: inputsDisabled,
    },
    {
      name: "userDNI",
      label: "Cédula del propietario:",
      type: "number",
      placeholder: "Cédula del propietario",
      alertText: "Cédula del propietario requerido",
      value: userDNI,
      disabled: inputsDisabled,
    },
    {
      name: "accountHolderEmail",
      label: "Email del propietario:",
      type: "email",
      placeholder: "Email del propietario",
      alertText: "Email del propietario requerido",
      value: accountHolderEmail,
      disabled: inputsDisabled,
    },
    {
      name: "accountPassword",
      label: "Contraseña de la cuenta:",
      type: cvvTextType,
      placeholder: "Contraseña de la cuenta",
      alertText: "Contraseña de la cuenta requerido",
      value: accountPassword,
      disabled: inputsDisabled,
    },
  ];

  const { setResearch } = useCardAccounts();

  useEffect(() => {
    const duser = localStorage.getItem("user");
    if (duser) {
      const user = JSON.parse(duser);
      setUser(user);
    }
  }, []);

  const handleSave = handleSubmit((data) => {
    if (card) {

      const cardData: ICardResponse = {
        id: id,
        name: data.name ? data.name : "",
        number: data.number ? data.number : "",
        cardType: cardType ? cardType : "",
        cardHolderName: data.cardHolderName ? data.cardHolderName : "",
        cvv: data.code ? data.code : "",
        expirationDate: data.expirationDate ? data.expirationDate : "",
      };

      fetchUpdateCard(cardData).then((response) => {
        if (response) {
          toast.success("Tarjeta modificada exitosamente");
          closeModal();
          setResearch(true);
          //window.location.reload();
        }
      });
      console.log(cardData);
    } else if (!card) {
      const accountData: IBankCoopAccountResponse = {
        id: id,
        name: data.name ? data.name : "",
        number: data.number ? data.number : "",
        accountType: accountType ? accountType : "",
        bankName: bank ? bank : "",
        accountHolderName: data.accountHolderName ? data.accountHolderName : "",
        accountHolderDNI: data.userDNI ? data.userDNI : "",
        accountHolderEmail: data.accountHolderEmail
          ? data.accountHolderEmail
          : "",
        accountPassword: data.accountPassword ? data.accountPassword : "",
      };

      console.log("account", { accountData });

      fetchUpdateAccount(accountData).then((response) => {
        if (response) {
          toast.success("Cuenta modificada exitosamente");
          closeModal();
          setResearch(true);
          //window.location.reload();
        }
      });
    }
  });

  const handleBankChange = (bank: string) => {
    setIsBankSelected(true);
    setBank(bank);
  };

  const handleAccountTypeChange = (accountType: string) => {
    setIsAccountTypeSelected(true);
    setAccountType(accountType);
  };

  const handleDelete = () => {
    if (card) {
      fetchDeleteCard(id).then((response) => {
        if (response) {
          toast.success("Tarjeta eliminada exitosamente");
          setResearch(true);
          closeModal();
          window.location.reload();
        }
      });
    } else if (!card) {
      fetchDeleteAccount(id).then((response) => {
        if (response) {
          toast.success("Cuenta eliminada exitosamente");
          setResearch(true);
          closeModal();
          window.location.reload();
        }
      });
    }
  };

  const handleSetPrefered = () => {
    if (client) {
      if (card == true && user) {
        fetchSetPreferedPaymentClient(user.id, id, "CARD").then((response) => {
          if (response) {
            toast.success("Tarjeta preferida actualizada exitosamente");
            closeModal();
            setResearch(true);
            router.push("/user");
            //window.location.reload();
          }
        });
      } else if (!card && user) {
        fetchSetPreferedPaymentClient(user.id, id, "ACCOUNT").then(
          (response) => {
            if (response) {
              toast.success("Cuenta preferida actualizada exitosamente");
              closeModal();
              setResearch(true);
              router.push("/user");
              //window.location.reload();
            }
          }
        );
      }
    } else {
      if (user) {
        fetchSetPreferedPaymentCompany(user.id, id).then((response) => {
          if (response) {
            toast.success("Cuenta preferida actualizada exitosamente");
            closeModal();
            setResearch(true);
            router.push("/enterprise");
            //window.location.reload();
          }
        });
      }
    }
  };

  const [cardType, setCardType] = useState(type);

  const handleTypechange = (type: string) => {
    setCardType(type);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center ">
      <div className="flex flex-col justify-center items-center bg-white p-5 rounded-lg gap-5 m-auto">
        {card && (
          <div className="modal__form">
            <div className="h-32">
              <HiOutlineCreditCard className="h-16 mb-4 w-full" />
              <Button
                texto="Establecer como predeterminada"
                onclick={handleSetPrefered}
              />
            </div>

            <div className="max-w-lg">
              <form className="flex flex-col w-32rem">
                {cardDatas.map((cardData, index) => (
                  <div className="pb-4 block" key={index}>
                    <label className="block pb-2 "> {cardData.label}</label>
                    <input
                      className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                      type={cardData.type}
                      defaultValue={cardData.value}
                      disabled={cardData.disabled}
                      placeholder={cardData.placeholder}
                      {...register(cardData.name, {
                        required: false,
                        validate: (value) => {
                          if (cardData.name === "code") {
                            return (String(value)).length >= 3 && (String(value)).length <= 4;
                          }
                          if (cardData.name === "number") {
                            return (String(value)).length >= 16 && (String(value)).length <= 19;
                          }

                        },

                      })}
                    />
                    {errors[cardData.name] && (
                      <span className="text-red-500">{cardData.alertText}</span>
                    )}
                  </div>
                ))}
                <ComboBox
                  label="Tipo de tarjeta:"
                  defaultValue={
                    type == "TARJETA DE CREDITO"
                      ? "TARJETA DE CREDITO"
                      : "TARJETA DE DEBITO"
                  }
                  onChange={handleTypechange}
                  options={
                    type == "TARJETA DE CREDITO"
                      ? ["TARJETA DE DEBITO"]
                      : ["TARJETA DE CREDITO"]
                  }
                  disabled={inputsDisabled}
                />
              </form>
            </div>
          </div>
        )}

        {!card && (
          <div className="modal__form= p-8">
            <div className="h-32">
              <HiOutlineLibrary className="h-16 mb-4 w-full" />
              <Button
                texto="Establecer como predeterminada"
                onclick={handleSetPrefered}
              />
            </div>

            <div className="max-w-2xl">
              <form className="flex gap-8 mt-4 items-center justify-center">
                <div className="flex-1 flex flex-col">
                  {bankDatasCol1.map((bankData, index) => (
                    <div className="pb-4 block" key={index}>
                      <label className="block pb-2 "> {bankData.label}</label>
                      <input
                        className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                        type={bankData.type}
                        defaultValue={bankData.value}
                        disabled={bankData.disabled}
                        placeholder={bankData.placeholder}
                        {...register(bankData.name, {
                          required: false,
                          validate: (value) => {
                            if (bankData.name === "number") {
                              return (String(value)).length >= 20 && (String(value)).length <= 24;
                            }

                          },
                        })}
                      />
                      {errors[bankData.name] && (
                        <span className="text-red-500">
                          {bankData.alertText}
                        </span>
                      )}
                    </div>
                  ))}
                  <div className="pb-4 block">
                    <BanksComboBox
                      label="Banco:"
                      arrayDeOpciones={BankCoopEnum}
                      onChange={handleBankChange}
                      disabled={inputsDisabled}
                      defaultValue={bankName}
                    />
                  </div>
                  <div className="pb-4 block">
                    <ComboBox
                      label="Tipo de cuenta:"
                      options={
                        type == "CUENTA CORRIENTE"
                          ? ["CUENTA DE AHORROS"]
                          : ["CUENTA CORRIENTE"]
                      }
                      onChange={handleAccountTypeChange}
                      defaultValue={
                        type == "CUENTA CORRIENTE"
                          ? "CUENTA CORRIENTE"
                          : "CUENTA AHORROS"
                      }
                      disabled={inputsDisabled}
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  {bankDatasCol2.map((bankData, index) => (
                    <div className="pb-4 block" key={index}>
                      <label className="block pb-2 "> {bankData.label}</label>
                      <input
                        className="border border-solid border-gray-300 py-2 px-4 rounded-full w-full"
                        type={bankData.type}
                        defaultValue={bankData.value}
                        disabled={bankData.disabled}
                        placeholder={bankData.placeholder}
                        {...register(bankData.name, {
                          required: false,
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
            </div>
          </div>
        )}

        <div className="flex justify-between gap-4 w-full">
          {inputsDisabled && (
            <div
              className="w-full px-0 cursor-pointer flex items-center justify-center"
              onClick={handleModificarClick}
            >
              <Button texto="Modificar" />
            </div>
          )}
          <div
            className="w-full px-0 cursor-pointer flex items-center justify-center"
            onClick={closeModal}
          >
            <Button texto="Cancelar" onclick={closeModal} />
          </div>
          <div
            className="w-full px-0 cursor pointer flex items-center justify-center "
            onClick={handleDelete}
          >
            <Button texto="Eliminar" onclick={handleDelete} />
          </div>
        </div>

        {showSaveButton && (
          <div className="w-full px-0 cursor-pointer flex items-center justify-center">
            <SecondaryButton texto="Guardar cambios" onclick={handleSave} />
          </div>
        )}
      </div>
    </div>
  );
}
