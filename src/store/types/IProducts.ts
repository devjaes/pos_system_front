export interface IProductResponse {
  id: number;
  name: string;
  mainCode: string;
  auxCode: string;
  description: string;
  stock: number;
  unitPrice: number;
  ivaType: string;
  iceType: string;
  irbpType: string;
}

export interface IProductCreate {
  name: string;
  mainCode: string;
  auxCode: string;
  description: string;
  stock: number;
  unitPrice: number;
  ivaType: string;
  iceType: string;
  irbpType: string;
}

export interface IProductUpdate {
  name?: string;
  mainCode?: string;
  auxCode?: string;
  description?: string;
  stock?: number;
  unitPrice?: number;
  ivaType?: string;
  iceType?: string;
  irbpType?: string;
}
