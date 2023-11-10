import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  OperatorFunction,
  Subject,
  UnaryFunction,
  combineLatest,
  filter,
  map,
  pipe,
  scan,
  startWith,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Pizza } from 'src/app/models/pizza';
import { PizzaService, PizzaType } from 'src/app/services/pizza.service';

export const filterNullish = <T>(): UnaryFunction<
  Observable<T | null | undefined>,
  Observable<T>
> => {
  return pipe(
    filter((x: T | null | undefined) => x != null) as OperatorFunction<
      T | null | undefined,
      T
    >,
  );
};

@Component({
  selector: 'app-complex-state',
  templateUrl: './complex-state.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
// export class ComplexStateComponent implements OnInit {
//   public PizzaType = PizzaType;
//   public pizzaService = inject(PizzaService);

//   public tax = 1.23;

//   public pizzaType: PizzaType = PizzaType.Meat;
//   public pizzas: Pizza[] = [];
//   public order: Pizza[] = [];
//   public orderPrice: number = 0;
//   public isLoading = true;

//   public ngOnInit(): void {
//     this.getPizzas(this.pizzaType);
//   }

//   public getPizzas(pizzaType: PizzaType) {
//     this.isLoading = true;

//     this.pizzaService
//       .getAllPizzas(pizzaType)
//       .pipe(take(1))
//       .subscribe((pizzas) => {
//         if(this.order) {
//           // some logic
//         }
//       });
//   }

//   public addPizzaToOrder(orderedPizza: Pizza) {
//     this.order = [...this.order, orderedPizza];

//     this.calculateOrderPrice();
//   }

//   public removePizzaFromOrder(orderedPizzaIndex: number) {
//     this.order = this.order.filter(
//       (pizza, index) => orderedPizzaIndex !== index,
//     );

//     this.calculateOrderPrice();
//   }

//   public setPizzaType(pizzaType: PizzaType) {
//     this.pizzaType = pizzaType;

//     this.getPizzas(this.pizzaType);
//   }

//   private calculateOrderPrice() {
//     this.orderPrice =
//       this.order.reduce((acc, pizza) => acc + pizza.price, 0) * this.tax;
//   }
// }
// DECLARATIVE
// export class ComplexStateComponent {
//   public PizzaType = PizzaType;
//   public pizzaService = inject(PizzaService);

//   public readonly pizzaType$$ = new BehaviorSubject(PizzaType.Meat);

//   public readonly pizzas$ = this.pizzaType$$.pipe(
//     switchMap((pizzaType) => this.pizzaService.getAllPizzas(pizzaType)),
//     startWith(null),
//   );

//   public readonly order$$ = new BehaviorSubject<Pizza[]>([]);

//   public readonly orderPrice$ = this.order$$.pipe(
//     map((order) => order.reduce((acc, pizza) => acc + pizza.price, 0)),
//   );

//   public addPizzaToOrder(orderedPizza: Pizza) {
//     this.order$$.next([...this.order$$.value, orderedPizza]);
//   }

//   public removePizzaFromOrder(orderedPizzaIndex: number) {
//     this.order$$.next(
//       this.order$$.value.filter((pizza, index) => orderedPizzaIndex !== index),
//     );
//   }
// }
// EVEN MORE
export class ComplexStateComponent {
  public PizzaType = PizzaType;
  public pizzaService = inject(PizzaService);

  public loading = false;

  public readonly tax = 1.23;

  public readonly pizzaType$$ = new BehaviorSubject(PizzaType.Meat);

  public readonly pizzas$ = this.pizzaType$$.pipe(
    switchMap((pizzaType) => this.pizzaService.getAllPizzas(pizzaType)),
    startWith(null),
  );

  public readonly desserts$ = new Subject<{
    name: 'add' | 'remove';
    index: number;
  }>();

  public readonly order$ = this.desserts$.pipe(
    withLatestFrom(this.pizzas$.pipe(filterNullish())),
    scan((acc, [action, allPizzas]) => {
      return action.name === 'add'
        ? [...acc, allPizzas[action.index]]
        : acc.filter((pizza, index) => index !== action.index);
    }, [] as Pizza[]),
  );

  public readonly pizzaMaker$ = this.order$.pipe(
    map(
      (order) => order.reduce((acc, pizza) => acc + pizza.price, 0) * this.tax,
    ),
  );

  public ngOnInit() {
    this.pizzas$
      .pipe(filter((pizzas) => Boolean(pizzas && pizzas.length)))
      .subscribe((pizzas) => {
        // some logic
      });

    this.pizzaMaker$.pipe(
      filter((pizzaMaker) => !!pizzaMaker),
      tap((pizzaMaker) => {
        // some logic
      }),
      switchMap((pizzaMaker) =>
        this.order$.pipe(
          map((order) => {
            // some logic
          }),
        ),
      ),
    ).subscribe((mappedOrder) => {
      // some logic
    })

    this.desserts$
      .pipe(
        filter((desserts) => !!desserts),
        tap(() => (this.loading = false)),
      )
      .subscribe((desserts) => {
        // some logic
      });
  }
}
