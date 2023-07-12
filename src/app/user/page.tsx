"use client";
import React from "react";
import InfoCuenta from "@/components/bankAccountInfo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TClientsResponse } from "@/store/types/IUserResponses";
import {
  IBankCoopAccountResponse,
  ICardResponse,
  IPaymentResponse,
} from "@/store/types/IPaymentMethods";
import { fetchGetPreferedPaymentClient } from "@/store/api/userApi";
import { fetchGetClientPayments } from "@/store/api/paymentApi";
import Payment from "@/components/payment";
import Prefered from "@/components/preferedAcount";
import { useCardAccounts } from "@/context/CardAccountsProvider";

function HomePageUsuario() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [payments, setPayments] = useState<IPaymentResponse[]>([]);
  const { preferedAccount } = useCardAccounts();
  let preferedAccountType = "";

  if (preferedAccount) {
    preferedAccountType = "cvv" in preferedAccount ? "card" : "bank";
  }

  useEffect(() => {
    const user = window.localStorage.getItem("user");

    if (user === null) {
      console.log("no hay usuario");
      router.push(`/`);
    } else {
      const client = JSON.parse(user) as TClientsResponse;
      client.name &&
        setUserName(
          client.name.split(" ")[0] + " " + client.name.split(" ")[1]
        );

      fetchGetClientPayments(client.dni).then((res) => {
        if (res) {
          setPayments(res);
          console.log(res);
        }
      });
    }
  }, []);

  return (
    <div>
      <div className=" flex h-80 bg-image ">
        <h2 className="bg-transparency w-full flex justify-center items-center h-full text-neutral-50 font-bold text-2xl">
          Tus transacciones más seguras {userName}
        </h2>
      </div>

      <main className="my-0 mx-auto max-w-screen-lg">
        {preferedAccount && (
          <div className="flex justify-center items-center">
            <Prefered {...preferedAccount} preferedType={preferedAccountType} />
          </div>
        )}
        <h1 className="text-center mt-6 font-bold text-xl mb-6">
          Tus movimientos
        </h1>

        {payments && (
          <div className="grid grid-cols-3 justify-center items-center cursor-pointer">
            {payments.map((payment, index) => (
              <Payment {...payment} key={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePageUsuario;
