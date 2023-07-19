import { ISellingProductsPDF } from "./ISellingProducts";

export interface IInvoiceResponse {
  id: number;
  environmentType: string;
  emissionType: string;
  accessKey: string;
  receiptType: string;
  customerId: number;
  emissionDate: string;
  remissionGuide: string;
  totalWithoutTax: number;
  totalDiscount: number;
  tip: number;
  paymentType: string;
  total: number;
  currency: string;
  boxId: number;
  boxKey: number;
  branchName: string;
  sellingProducts?: ISellingProductsPDF[];
}

export interface IInvoiceCreate {
  environmentType: string;
  emissionType: string;
  receiptType: string;
  customerIdentification: string;
  paymentType: string;
  boxId: number;
}

export interface IInvoicePDF {
  logo: string;
  from: string; //store.name
  to: string; //client.name
  currency: string;
  number: string; //invoice.accessKey
  paymentTerms: string; 
  items: IInvoiceItems[];
  fields: {tax: string; total: string; subTotal: string; discount: string; tip: string; };
  tax: number;
  notes?: string;
  terms?: string;
}
export interface IInvoiceItems {
  quantity: number;
  name: string;
  description: string;
  unitPrice: number;
}