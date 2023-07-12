export interface ICardResponse {
  id: number;
  name: string;
  number: string;
  cardType: string;
  cardHolderName: string;
  cvv: string;
  expirationDate: string;
}

export interface IBankCoopAccountResponse {
  id: number;
  name: string;
  number: string;
  accountType: string;
  bankName: string;
  accountHolderName: string;
  accountHolderDNI: string;
  accountHolderEmail: string;
  accountPassword: string;
}

export interface IPaymentCreation {
  name: string;
  amount: number;
  description: string;
  paymentDate: string;
  companyName: string;
  companyRuc: string;
  companyAccountName: string;
  companyAccountNumber: string;
  clientDNI: string;
  clientName?: string;
}

export interface IPartPaymentCreation {
  name: string;
  amount: number;
  description: string;
  companyAccountName: string;
  companyAccountNumber: string;
}

export interface IPaymentMethodRegister {
  name: string;
  client: boolean;
  card: boolean;
  userDNI: string;
  number: string;
  type: string;
  bankName: string;
  holderName: string;
  code: string;
  expirationDate: string;
  accountHolderDNI: string;
  accountHolderEmail: string;
}

export interface IPaymentResponse {
  id: number;
  name: string;
  amount: number;
  description: string;
  paymentDate: string;
  companyName: string;
  companyRuc: string;
  companyAccountName: string;
  companyAccountNumber: string;
  clientName: string;
  clientDNI: string;
  clientAccountName: string;
  clientAccountNumber: string;
}

export interface IPaymentMethodsResponse {
  bankCoopCurrentsAccounts: IBankCoopAccountResponse[];
  bankCoopSavingsAccounts: IBankCoopAccountResponse[];
  debitCards: ICardResponse[];
  creditCards: ICardResponse[];
}
