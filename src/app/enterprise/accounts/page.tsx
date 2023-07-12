"use client";
import React from "react";
import AgregarCuenta from "@/components/addAccount";
import { useState } from "react";
import AddAccountModal from "@/components/addAcountModal";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import BankAccount from "@/components/bankAccountInfo";
import { useCardAccounts } from "@/context/CardAccountsProvider";

export default function userAccount() {
  const router = useRouter();
  const [addAccount, setAddAccount] = useState(false);
  const { cAccounts, sAccounts } = useCardAccounts();

  const closeAddAccount = () => {
    setAddAccount(false);
  };

  const openAddAccount = () => {
    setAddAccount(true);
  };

  useEffect(() => {
    const user = window.localStorage.getItem("user");

    if (user === null) {
      toast.error("no hay usuario");
      router.push(`/`);
    }
  }, []);

  return (
    <div className="my-0 mx-auto max-w-screen-xl">
      <h1 className="text-3xl text-center font-bold mt-4">Tus cuentas</h1>

      {cAccounts && (
        <div className="flex flex-col">
          <label className="text-2xl text-center font-bold mt-4">
            {cAccounts.length > 0 ? "Cuentas Corrientes" : ""}
          </label>
          <div className="grid grid-cols-3">
            {cAccounts.map((account, index) => {
              return (
                <div className="cursor-pointer m-4" key={index}>
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
            {sAccounts.length > 0 ? "Cuentas de Ahorros" : ""}
          </label>
          <div className="grid grid-cols-3">
            {sAccounts.map((account, index) => {
              return (
                <div className="cursor-pointer m-4" key={index}>
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
