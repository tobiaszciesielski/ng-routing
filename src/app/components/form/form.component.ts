import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { Pizza } from 'src/app/models/pizza';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza-form',
  templateUrl: './form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class FormComponent {
  public pizzaService = inject(PizzaService);
  public formBuilder: FormBuilder = inject(FormBuilder);
  public route: ActivatedRoute = inject(ActivatedRoute);

  public form = this.formBuilder.nonNullable.group({
    name: '',
    price: 0,
  });

  public pizza$: Observable<Pizza | null> = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get('pizzaId')),
    switchMap((pizzaId) =>
      pizzaId ? this.pizzaService.getPizzaById(+pizzaId) : of(null),
    ),
  );

  public ngOnInit() {
    this.pizza$.subscribe((pizza) => {
      pizza ? this.form.patchValue({ ...pizza }) : this.form.reset();
    });
  }

  public submit() {
    const pizza = this.form.value;

    this.pizzaService
      .addPizza({
        price: pizza.price || 0,
        name: pizza.name || '',
      })
      .subscribe();
  }
}
// export class FormComponent {
//   public formBuilder: FormBuilder = inject(FormBuilder);

//   @Input()
//   public set pizza(pizza: Pizza | null) {
//     pizza ? this.form.patchValue({ ...pizza }) : this.form.reset();
//   }
//   @Output()
//   public submitPizza: EventEmitter<Pizza> = new EventEmitter<Pizza>();

//   form = this.formBuilder.nonNullable.group({
//     name: '',
//     price: 0,
//   });

//   public submitForm() {
//     this.submitPizza.emit({
//       name: this.form.value.name || '',
//       price: this.form.value.price || 0,
//     });
//   }
// }

// @Component({
//   selector: 'app-pizza-wrapper',
//   template: `
//   <app-pizza-form
//     [pizza]="pizza$ | async"
//     (submitPizza)="addPizza($event)"
//   >
//   </app-pizza-form>`,
//   standalone: true,
//   imports: [FormComponent, CommonModule, FormsModule, ReactiveFormsModule],
// })
// export class PizzaWrapperComponent {
//   public pizzaService = inject(PizzaService);
//   public route: ActivatedRoute = inject(ActivatedRoute);

//   public pizza$: Observable<Pizza | null> = this.route.paramMap.pipe(
//     map((paramMap) => paramMap.get('pizzaId')),
//     switchMap((pizzaId) =>
//       pizzaId ? this.pizzaService.getPizzaById(+pizzaId) : of(null),
//     ),
//   );

//   public addPizza(pizza: Pizza) {
//     this.pizzaService.addPizza(pizza).subscribe();
//   }
// }
