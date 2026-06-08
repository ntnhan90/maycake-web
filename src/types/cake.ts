export interface Topping {

  id: number;

  name: string;

  image: string;

  price: number;

  category: string;
}

export type CartItem = {

  id: number;

  name: string;

  image: string;

  price: number;

  qty: number;

};

export type CakeConfig = {

  size: string;

  shape: string;

  color: string;

  flavor: string;

  customerName: string;

  phone: string;

  note: string;

  toppings: CartItem[];

};