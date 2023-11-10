import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dessert, Pizza } from '../models/pizza';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DessertService {
  private readonly api: string = `http://localhost:3000`;

  private httpClient = inject(HttpClient);

  public getAllDesserts(): Observable<Dessert[]> {
    return this.httpClient.get<Pizza[]>(`${this.api}/desserts`);
  }
}
