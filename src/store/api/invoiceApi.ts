import config from "../../../config/serverConfig";
import {
  IInvoiceCreate,
  IInvoicePDF,
  IInvoiceResponse,
} from "../types/IInvoices";
import { NextApiRequest, NextApiResponse } from "next";

export const handleGetInvoice = async (invoiceId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/invoices/${invoiceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("No se encontro la factura.");
      return;
    }
    const data = await response.json();
    const invoiceData: IInvoiceResponse = data;

    if (!invoiceData) {
      console.log("Error al obtener la factura.");
      return;
    }

    return invoiceData;
  } catch (error) {
    console.log({ error });
  }
};

export const handleGetAllInvoices = async () => {
  try {
    const response = await fetch(`${config.API_REST_BASE_URL}/invoices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("No se pudo obtener las facturas.");
      return;
    }
    const data = await response.json();
    const invoicesData: IInvoiceResponse[] = data;

    if (!invoicesData) {
      console.log("Error al obtener las facturas.");
      return;
    }

    return invoicesData;
  } catch (error) {
    console.log({ error });
  }
};

export const handleCreateInvoice = async (invoice: IInvoiceCreate) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/invoices/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
      }
    );

    if (!response.ok) {
      console.log("No se pudo crear la factura.");
      return;
    }
    const data = await response.json();
    const invoiceData: IInvoiceResponse = data;

    if (!invoiceData) {
      console.log("Error al crear la factura.");
      return;
    }

    return invoiceData;
  } catch (error) {
    console.log({ error });
  }
};

export const handleUpdateInvoiceValues = async (invoiceId: number) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/invoices/${invoiceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("No se pudo actualizar los valores de la factura.");
      return;
    }
    const data = await response.json();
    const invoiceData: IInvoicePDF = data;

    if (!invoiceData) {
      console.log("Error al actualizar los valores de la factura.");
      return;
    }

    return invoiceData;
  } catch (error) {
    console.log({ error });
  }
};

export const handleCreatePDF = async (
  invoice: IInvoicePDF,
  fileName: string
) => {
  try {
    const postData = JSON.stringify(invoice);

    // Haz la solicitud a tu endpoint en Next.js      
    const response = await fetch("http://localhost:3000/api/createPDF", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: postData,
    });
    console.log({ response });

    if (!response.ok) {
      console.log("No se pudo crear el PDF.");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log({ error });
  }
};

// generate pdf v2
