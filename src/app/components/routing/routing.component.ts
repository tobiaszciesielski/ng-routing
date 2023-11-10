import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { Pizza } from 'src/app/models/pizza';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  imports: [CommonModule, RouterModule],
  standalone: true,
})
// IMPERATIVE
// export class RoutingComponent {
//   public pizzaService = inject(PizzaService);
//   public route = inject(ActivatedRoute);

//   public pizzaId: string | null = null;
//   public pizza: Pizza | null = null;

//   public ngOnInit(): void {
//     this.route.paramMap.subscribe((paramMap) => {
//       this.pizzaId = paramMap.get('pizzaId');

//       this.getPizza(this.pizzaId);
//     });
//   }

//   public getPizza(pizzaId: string | null) {
//     if (pizzaId) {
//       this.pizzaService.getPizzaById(+pizzaId).subscribe((pizza) => {
//         this.pizza = pizza;
//       });
//     }
//   }
// }
// Declarative with
export class RoutingComponent {
  public pizzaService = inject(PizzaService);
  public route = inject(ActivatedRoute);

  public pizzaId: string | null = null;
  public pizza: Pizza | null = null;

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap((paramMap) => this.getPizza(paramMap.get('pizzaId'))))
      .subscribe((pizza) => {
        this.pizza = pizza;
      });
  }

  public getPizza(pizzaId: string | null): Observable<Pizza | null> {
    if (!pizzaId) {
      return of(null);
    }

    return this.pizzaService.getPizzaById(+pizzaId);
  }
}
// DECLARATIVE
// export class RoutingComponent {
//   public pizzaService = inject(PizzaService);
//   public route = inject(ActivatedRoute);

//   public pizza$: Observable<Pizza | null> = this.route.paramMap.pipe(
//     map((paramMap) => paramMap.get('pizzaId')),
//     switchMap((pizzaId) =>
//       pizzaId ? this.pizzaService.getPizzaById(+pizzaId) : of(null),
//     ),
//   );
// }
