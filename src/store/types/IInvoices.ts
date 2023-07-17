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
}

export interface IInvoiceCreate {
  environmentType: string;
  emissionType: string;
  receiptType: string;
  customerIdentification: string;
  paymentType: string;
  boxId: number;
}
