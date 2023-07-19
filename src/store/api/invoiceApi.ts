import config from "../../../config/serverConfig";
import { IInvoiceCreate, IInvoicePDF, IInvoiceResponse } from "../types/IInvoices";

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

export const handleUpdateInvoiceValues = async (
  invoiceId: number,
  invoice: {
    invoice: { description: string; amount: number; unitPrice: number };
  }
) => {
  try {
    const response = await fetch(
      `${config.API_REST_BASE_URL}/invoices/${invoiceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
      }
    );

    if (!response.ok) {
      console.log("No se pudo actualizar los valores de la factura.");
      return;
    }
    const data = await response.json();
    const invoiceData: IInvoiceResponse = data;

    if (!invoiceData) {
      console.log("Error al actualizar los valores de la factura.");
      return;
    }

    return invoiceData;
  } catch (error) {
    console.log({ error });
  }
};

export const handleCreatePDF = async (invoice: IInvoicePDF, filename:string) => {
  try{
    var postData = JSON.stringify(invoice);
    const response = await fetch("https://invoice-generator.com/ubl", {
      method    : "POST",
      mode      : "cors",
      headers   : {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData).toString(),
          "Access-Control-Allow-Origin": "invoice-generator.com",
      }
    })

    if(!response){
      console.log("No se pudo crear el PDF.");
      return;
    }

    const data = await response.json();

    return data.data;
      

  }catch(error){
    console.log({error})
  }

};
