export interface Pizza {
  id?: number;
  price: number;
  name: string;
  ingredients?: string[];
}

export interface Dessert {
  id?: number;
  price: number;
  name: string;
  ingredients?: string[];
}

export interface Drink {}

export enum Currency {
  Eur = 'eur',
  Pln = 'pln',
  Usd = 'usd',
  Gbp = 'gbp',
}
