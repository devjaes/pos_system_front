"use client";

import {
  fetchClientPaymentMethods,
  fetchCompanyPaymentMethods,
} from "@/store/api/cardAccountsApi";
import {
  fetchGetPreferedPaymentClient,
  fetchGetPreferedPaymentCompany,
} from "@/store/api/userApi";
import {
  IBankCoopAccountResponse,
  ICardResponse,
} from "@/store/types/IPaymentMethods";
import { createContext, useContext, useEffect, useState } from "react";

interface ICardAccountsContext {
  cCards: ICardResponse[];
  cAccounts: IBankCoopAccountResponse[];
  dCards: ICardResponse[];
  sAccounts: IBankCoopAccountResponse[];
  preferedAccount: ICardResponse | IBankCoopAccountResponse | undefined;

  setResearch: (value: boolean) => void;
}

export const CardAccountsContext = createContext<ICardAccountsContext>({
  cCards: [],
  cAccounts: [],
  dCards: [],
  sAccounts: [],
  preferedAccount: undefined,
  setResearch: () => { },
});

export const useCardAccounts = () => {
  const context = useContext(CardAccountsContext);
  if (!context) {
    throw new Error(
      "useCardAccounts debe estar dentro del proveedor CardAccounts"
    );
  }
  return context;
};

export const CardAccountsProvider = ({
  children,
  userId,
  userType,
}: {
  children: React.ReactNode;
  userId: number;
  userType: string;
}) => {
  const [cCards, setCCards] = useState<ICardResponse[]>([]);
  const [cAccounts, setCAccounts] = useState<IBankCoopAccountResponse[]>([]);
  const [dCards, setDCards] = useState<ICardResponse[]>([]);
  const [sAccounts, setSAccounts] = useState<IBankCoopAccountResponse[]>([]);
  const [preferedAccount, setPreferedAccount] = useState<
    ICardResponse | IBankCoopAccountResponse | undefined
  >(undefined);
  const [research, setResearch] = useState(false);

  const fechtData = async () => {
    if (userType === "CLIENT") {
      fetchClientPaymentMethods(userId).then((res) => {
        if (res) {
          setCCards(res.creditCards as ICardResponse[]);
          setCAccounts(
            res.bankCoopCurrentsAccounts as IBankCoopAccountResponse[]
          );
          setDCards(res.debitCards as ICardResponse[]);
          setSAccounts(
            res.bankCoopSavingsAccounts as IBankCoopAccountResponse[]
          );
        }
      });
      fetchGetPreferedPaymentClient(userId).then((res) => {
        if (res) {
          setPreferedAccount(res);
        }
      });
    } else {
      fetchCompanyPaymentMethods(userId).then((res) => {
        if (res) {
          setCAccounts(
            res.bankCoopCurrentsAccounts as IBankCoopAccountResponse[]
          );
          setSAccounts(
            res.bankCoopSavingsAccounts as IBankCoopAccountResponse[]
          );
        }
      });
      fetchGetPreferedPaymentCompany(userId).then((res) => {
        if (res) {
          setPreferedAccount(res);
        }
      });
    }
  };

  useEffect(() => {
    fechtData();
  }, []);

  useEffect(() => {
    fechtData();
    console.log("se ejecuto");
    setResearch(false);
  }, [research]);

  return (
    <CardAccountsContext.Provider
      value={{
        cCards: cCards,
        cAccounts: cAccounts,
        dCards: dCards,
        sAccounts: sAccounts,
        preferedAccount: preferedAccount,
        setResearch: setResearch,
      }}
    >
      {children}
    </CardAccountsContext.Provider>
  );
};
