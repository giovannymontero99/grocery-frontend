export interface User {
  Name: string;
  Email?: string;
  FullName?: string;
  Password: string;
}

export interface UserRs {
  id?: number,
  name?: string,
  email?: string,
  numberPhone?: string | null,
  password?: string | null,
  fullName?: string
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string | null;
  isActive: boolean;
}

export interface UserProductRs {
  userProductId: number,
  quantity: number,
  addedAt: string,
  idUser: number,
  idProduct: number,
  isSaved: boolean,
  products?: Product
}