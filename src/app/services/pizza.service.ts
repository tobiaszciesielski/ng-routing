import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pizza } from '../models/pizza';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PizzaService {
  private readonly api: string = `http://localhost:3000`;

  private httpClient = inject(HttpClient);


  public getAllPizzas(): Observable<Pizza[]> {
    return this.httpClient.get<Pizza[]>(`${this.api}/pizzas`);
  }

  public getPizzaById(pizzaId: Pizza['id']) {
    return this.httpClient.get(`${this.api}/pizzas/${pizzaId}`);
  }
}
