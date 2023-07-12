import config from "../../../config/serverConfig";
import {
  IBankCoopAccountResponse,
  ICardResponse,
  IPaymentMethodRegister,
  IPaymentMethodsResponse,
} from "../types/IPaymentMethods";

export const fetchClientPaymentMethods = async (clientId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/paymentmethod/client/${clientId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Error al obtener las cuentas y tarjetas del cliente.");
      return;
    }

    const data = await response.json();

    const paymentMethodsData: IPaymentMethodsResponse = data.paymentMethods;

    if (!paymentMethodsData) {
      console.log("No se pudo obtener las cuentas y tarjetas del cliente.");
      return;
    }

    return paymentMethodsData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCompanyPaymentMethods = async (companyId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/paymentmethod/company/${companyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Error al obtener las cuentas de la empresa.");
      return;
    }

    const data = await response.json();

    const paymentMethodsData: IPaymentMethodsResponse = data.paymentMethods;

    if (!paymentMethodsData) {
      console.log("No se pudo obtener las cuentas de la empresa.");
      return;
    }

    return paymentMethodsData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRegisterPaymentMethod = async (
  paymentMethod: IPaymentMethodRegister
) => {
  try {
    const response = await fetch(`${config.API_REST_BASE_URL}/paymentmethod`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentMethod),
    });

    if (!response.ok) {
      let message = await response.json();
      console.log(message);
      console.log("Error al registrar la cuenta o tarjeta.");
      return;
    }

    const data = await response.json();

    return data.account;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUpdateCard = async (card: ICardResponse) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/paymentmethod/card`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(card),
      }
    );

    if (!response.ok) {
      console.log("Error al modificar la tarjeta.");
      return;
    }

    const data = await response.json();

    return data.card;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUpdateAccount = async (account: IBankCoopAccountResponse) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/paymentmethod/account`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(account),
      }
    );

    if (!response.ok) {
      console.log("Error al modificar la cuenta.");
      return;
    }

    const data = await response.json();

    return data.account;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeleteCard = async (cardId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/paymentmethod/delete/${cardId}?type=CARD`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Error al eliminar la tarjeta.");
      return;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeleteAccount = async (accountId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/paymentmethod/delete/${accountId}?type=ACCOUNT`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Error al eliminar la cuenta.");
      let message = await response.json();
      console.log(message);
      return;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
