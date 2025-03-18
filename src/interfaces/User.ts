export interface UserAdmin {
  id: string;
  nameFirst: string;
  nameMiddle?: string;
  nameLast: string;
  phone: string;
  email: string;
  imageUrl: string;
  addressState: string;
  addressCountry: string;
  addressCity: string;
  addressStreet: string;
  addressHouseNumber: number;
  addressZip: number;
  isAdmin: string;
  isBusiness: string;
  createdAt: Date;
}

export interface User {
  _id: string;
  name: {
    first: string;
    middle?: string;
    last: string;
    _id?: string;
  };
  phone: string;
  email: string;
  image: {
    url?: string;
    alt?: string;
    _id?: string;
  };
  address: {
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip?: number;
    _id?: string;
  };
  isAdmin: boolean;
  isBusiness: boolean;
  classCode?: string;
  createdAt: string;
}

export interface UserReg {
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  phone: string;
  email: string;
  password: string;
  image: {
    url?: string;
    alt?: string;
  };
  address: {
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };

  isBusiness: boolean;
}

export interface UserLoginFormValues {
  email: string;
  password: string;
}
