export interface ISellingProductsResponse {
  id: number;
  invoiceId: number;
  productMainCode: string;
  productName: string;
  ivaApplied: string;
  discount: number;
  subtotal: number;
  taxValue: number;
  quantity: number;
}

export interface ISellingProductsEntrance {
  storeName: string;
  tradeName: string;
  ruc: string;
  address: string;
  especialTaxPayer: string;
  forcedAccounting: boolean;
}
