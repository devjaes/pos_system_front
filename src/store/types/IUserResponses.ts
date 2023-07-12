export default interface IUserResponse {
  id?: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  province: string;
  rol: string;
  dni?: string;
  gender?: string;
  ruc?: string;
  fundationDate?: string;
}

export interface IUserUpdate {
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  cityId: number;
}

export interface IResetPassword {
  newPassword: string;
}

export interface IResetPasswordData {
  email: string;
  name: string;
  dni_ruc: string;
  phoneNumber: string;
  originDate: string;
  type: string;
}
export interface IRegisterResponse {
  message: string;
  status: number;
  user: IUserResponse;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  rol: string;
  address: string;
  phoneNumber: string;
  originDate: string;
  cityId: number;
  dni_ruc: string;
  gender?: string;
}

export type TClientsResponse = {
  id: number;
  name: string;
  dni: string;
  gender: string;
  email: string;
  phoneNumber: string;
  city: string;
  province: string;
  address: string;
};

export type TEnterpriseResponse = {
  id: number;
  name: string;
  ruc: string;
  email: string;
  phoneNumber: string;
  city: string;
  province: string;
  address: string;
};

export interface ILoginResponse {
  message: string;
  status: number;
  user: IUserResponse;
}

export interface IImagesObject {
  fileName: string;
  image: Buffer;
  userId: string;
}
