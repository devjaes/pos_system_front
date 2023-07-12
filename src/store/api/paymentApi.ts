import config from "../../../config/serverConfig";
import { IPaymentCreation, IPaymentResponse } from "../types/IPaymentMethods";

export const fetchRegisterPayment = async (payment: IPaymentCreation) => {
  console.log({ payment });
  console.log("amount: ", payment.amount, typeof payment.amount);
  try {
    const response = await fetch(`${config.API_REST_BASE_URL}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payment),
    });

    if (response.status === 400) {
      console.log("Error de servidor");
      const data = await response.text();

      if (data) {
        const jsonData = JSON.parse(data);
        console.log({ jsonData });
      }

      return;
    }

    if (response.status === 204) {
      console.log("Error de cliente");
      return response;
    }

    const data = await response.text();

    if (data) {
      const jsonData = JSON.parse(data);
      console.log({ jsonData });
      const paymentResponse: IPaymentResponse = jsonData.payment;
      if (!paymentResponse) {
        console.log("No se pudo generar el pago.");
        return;
      }
      return paymentResponse;
    }

    console.log("No se pudo generar el pago.");
    return;
  } catch (error) {
    console.log({ error });
    return;
  }
};

export const fetchGetClientPayments = async (clientDNI: String) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/payment/client/${clientDNI}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) {
      return [];
    }

    if (!response.ok) {
      console.log("Error al obtener los pagos del cliente.");
      return;
    }

    const data = await response.json();

    const paymentResponse: IPaymentResponse[] = data.payments;

    if (!paymentResponse) {
      console.log("No se pudo obtener los pagos del cliente.");
      return;
    }

    return paymentResponse;
  } catch (error) {
    console.log({ error });
  }
};

export const fetchGetCompanyPayments = async (companyRuc: String) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/payment/company/${companyRuc}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) {
      return [];
    }

    if (!response.ok) {
      console.log("Error al obtener los pagos de la compania.");
      return;
    }

    const data = await response.json();

    const paymentResponse: IPaymentResponse[] = data.payments;

    if (!paymentResponse) {
      console.log("No se pudo obtener los pagos de la compania.");
      return;
    }

    return paymentResponse;
  } catch (error) {
    console.log({ error });
  }
};
