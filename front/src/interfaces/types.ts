export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
  quantity?: number;
}

export default IProduct;

export interface ICardProps {
  //
  product: IProduct;
}

export interface IProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export interface IUserData {
  email?: string;
  password?: string;
}

export interface ILoginErrors {
  email?: string;
  password?: string;
}

export interface ISignUpData {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
}

export type TSignUpErrors = Partial<ISignUpData>;

export interface IUserSession {
  [x: string]: unknown;

  user: {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    role: string;
    credential: {
      id: number;
      password: string;
    };

    orders: IOrder;
  };
}

export interface IOrder {
  id: number;
  status: string;
  date: Date;
  products: IProduct[];
  isCanceled?: boolean;
}

export interface IProductDetailsProps {
  params: Promise<{ id: string }>;
}

export interface ICategory {
  id: number;
  name: string;
}
