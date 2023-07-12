"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TEnterpriseResponse } from "@/store/types/IUserResponses";
import Button from "@/components/Button";
import { IPaymentResponse } from "@/store/types/IPaymentMethods";

import { fetchGetCompanyPayments } from "@/store/api/paymentApi";
import Payment from "@/components/payment";
import Prefered from "@/components/preferedAcount";
import RegisterPaymentModal from "@/components/RegisterPaymentModal";
import { useCardAccounts } from "@/context/CardAccountsProvider";

function HomePageEnterprise() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const { preferedAccount, setResearch } = useCardAccounts();
  const [payments, setPayments] = useState<IPaymentResponse[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const user = window.localStorage.getItem("user");

    if (user === null) {
      console.log("no hay usuario");
      router.push(`/`);
    } else {
      setResearch(true);
      const company = JSON.parse(user) as TEnterpriseResponse;
      company.name &&
        setUserName(
          company.name.split(" ")[0] + " " + company.name.split(" ")[1]
        );
      fetchGetCompanyPayments(company.ruc).then((res) => {
        if (res) {
          setPayments(res);
        }
      });
    }
  }, []);

  const handleToPayment = () => {
    setShowModal(true);
    //router.push(`/enterprise/payment`);
  };

  return (
    <div className="">
      <div className=" flex h-80 bg-image ">
        <h2 className="bg-transparency w-full flex justify-center items-center h-full text-neutral-50 font-bold text-2xl">
          Tus transacciones más seguras {userName}
        </h2>
      </div>

      <main className="my-0 mb-6 mx-auto max-w-screen-lg">
        <div className="flex flex-col items-center">
          {preferedAccount && (
            <div className="flex justify-center items-center">
              <Prefered {...preferedAccount} preferedType="bank" />
            </div>
          )}

          <div className="w-2/4 p-4 text-xl ">
            <Button
              texto="Realizar cobro"
              disabled={false}
              onclick={handleToPayment}
              key="paymentButton"
            ></Button>
          </div>
          {showModal && (
            <RegisterPaymentModal
              closeModal={() => setShowModal(false)}
            ></RegisterPaymentModal>
          )}
        </div>
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

export default HomePageEnterprise;
