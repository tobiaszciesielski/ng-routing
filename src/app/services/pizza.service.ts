import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dessert, Pizza } from '../models/pizza';
import { Observable, filter, map, of } from 'rxjs';

export enum PizzaType {
  Vegetarian = 'vegetarian',
  Vegan = 'vegan',
  Meat = 'meat',
}

@Injectable({ providedIn: 'root' })
export class PizzaService {
  private readonly api: string = `http://localhost:3000`;

  private httpClient = inject(HttpClient);

  public getAllPizzas(
    pizzaType: PizzaType = PizzaType.Meat,
  ): Observable<Pizza[]> {
    return this.httpClient.get<Pizza[]>(`${this.api}/pizzas`).pipe(
      map((pizzas) => {
        if (pizzaType === PizzaType.Meat) {
          return pizzas.filter((pizza) => pizza.name !== 'margherita');
        }

        if (pizzaType === PizzaType.Vegan) {
          return pizzas.filter((pizza) => pizza.name !== 'peperoni');
        }

        return pizzas.filter((pizza) => pizza.name !== 'marinara');
      }),
    );
  }

  public getAllDesserts(): Observable<Dessert[]> {
    return this.httpClient.get<Pizza[]>(`${this.api}/desserts`);
  }

  public getPizzaById(pizzaId: Pizza['id']): Observable<Pizza> {
    return this.httpClient.get<Pizza>(`${this.api}/pizzas/${pizzaId}`);
  }

  public addPizza(pizzaToAdd: {
    name: Pizza['name'];
    price: Pizza['price'];
  }): Observable<Pizza> {
    return this.httpClient.post<Pizza>(`${this.api}/pizzas`, {
      ...pizzaToAdd,
      ingredients: ['cheese', 'tomato sauce'],
    });
  }

  public checkIfPizzaMakerAlive(pizzaMakerId: number): Observable<boolean> {
    return of(!!pizzaMakerId);
  }
}
