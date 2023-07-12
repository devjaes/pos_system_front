"use client";
import BankAccount from "@/components/bankAccountInfo";
import AgregarCuenta from "@/components/addAccount";
import { useEffect, useState } from "react";
import AddAccountModal from "@/components/addAcountModal";
import Card from "@/components/cardInfo";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useCardAccounts } from "@/context/CardAccountsProvider";

export default function userAccount({ allAccounts }: { allAccounts: any }) {
  const router = useRouter();
  const [addAccount, setAddAccount] = useState(false);
  const [isCard, setIsCard] = useState(false);

  const { cCards, dCards, cAccounts, sAccounts } = useCardAccounts();

  useEffect(() => {
    const user = window.localStorage.getItem("user");

    if (user === null) {
      toast.error("no hay usuario");
      router.push(`/`);
    }
  }, []);

  console.log({ cCards }, { dCards }, { cAccounts }, { sAccounts });

  const closeAddAccount = () => {
    setAddAccount(false);
  };

  const openAddAccount = () => {
    setAddAccount(true);
  };

  return (
    <div className="my-0 mx-auto max-w-screen-xl">
      <h1 className="text-3xl text-center font-bold mt-4">Tus cuentas</h1>

      {cCards && (
        <div className="flex flex-col">
          <label className="text-2xl text-center font-bold mt-4">
            {cCards.length > 0 ? "Tarjetas de crédito" : ""}
          </label>
          <div className="grid grid-cols-3">
            {cCards.map((card, index) => {
              return (
                <div
                  onClick={() => {
                    setIsCard(true);
                  }}
                  className="cursor-pointer m-4"
                  key={index}
                >
                  <Card
                    id={card.id}
                    name={card.name}
                    number={card.number}
                    cardType={card.cardType}
                    cardHolderName={card.cardHolderName}
                    CVV={card.cvv}
                    expirationDate={card.expirationDate}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {dCards && (
        <div className="flex flex-col">
          <label className="text-2xl text-center font-bold mt-4">
            {dCards.length > 0 ? "Tarjetas de débito" : ""}
          </label>
          <div className="grid grid-cols-3">
            {dCards.map((card, index) => {
              return (
                <div
                  onClick={() => {
                    setIsCard(true);
                  }}
                  className="cursor-pointer m-4"
                  key={index}
                >
                  <Card
                    id={card.id}
                    name={card.name}
                    number={card.number}
                    cardType={card.cardType}
                    cardHolderName={card.cardHolderName}
                    CVV={card.cvv}
                    expirationDate={card.expirationDate}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {cAccounts && (
        <div className="flex flex-col">
          <label className="text-2xl text-center font-bold mt-4">
            {cAccounts.length > 0 ? "Cuentas corrientes" : ""}
          </label>
          <div className="grid grid-cols-3">
            {cAccounts.map((account, index) => {
              return (
                <div
                  onClick={() => {
                    setIsCard(true);
                  }}
                  className="cursor-pointer m-4"
                  key={index}
                >
                  <BankAccount
                    id={account.id}
                    name={account.name}
                    number={account.number}
                    accountType={account.accountType}
                    bankName={account.bankName}
                    accountHolderName={account.accountHolderName}
                    accountHolderDNI={account.accountHolderDNI}
                    accountHolderEmail={account.accountHolderEmail}
                    accountPassword={account.accountPassword}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {sAccounts && (
        <div className="flex flex-col">
          <label className="text-2xl text-center font-bold mt-4">
            {sAccounts.length > 0 ? "Cuentas de ahorro" : ""}
          </label>
          <div className="grid grid-cols-3">
            {sAccounts.map((account, index) => {
              return (
                <div
                  onClick={() => {
                    setIsCard(true);
                  }}
                  className="cursor-pointer m-4"
                  key={index}
                >
                  <BankAccount
                    id={account.id}
                    name={account.name}
                    number={account.number}
                    accountType={account.accountType}
                    bankName={account.bankName}
                    accountHolderName={account.accountHolderName}
                    accountHolderDNI={account.accountHolderDNI}
                    accountHolderEmail={account.accountHolderEmail}
                    accountPassword={account.accountPassword}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div onClick={openAddAccount} className="cursor-pointer m-4">
        <AgregarCuenta />
      </div>

      {addAccount && <AddAccountModal closeAddAccount={closeAddAccount} />}
    </div>
  );
}
