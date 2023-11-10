import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Pizza } from 'src/app/models/pizza';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-manual-subscribe',
  templateUrl: './manual-subscribe.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// IMPERATIVE
// export class ManualSubscribeComponent implements OnInit, OnDestroy {
//   public pizzaService = inject(PizzaService);
//   public changeDetector = inject(ChangeDetectorRef);

//   public destroy$: Subject<boolean> = new Subject<boolean>();

//   public pizzas: Pizza[] | null = null;

//   public ngOnInit(): void {
//     this.pizzaService
//       .getAllPizzas()
//       .pipe(takeUntil(this.destroy$))
//       .subscribe((pizzas) => {
//         this.pizzas = pizzas;

//         this.changeDetector.markForCheck();
//       });
//   }

//   public ngOnDestroy(): void {
//     this.destroy$.next(true);
//     this.destroy$.unsubscribe();
//   }
// }
// DECLARATIVE
export class DeclarativeComponent {
  public pizzaService = inject(PizzaService);

  public pizzas$: Observable<Pizza[]> = this.pizzaService.getAllPizzas();
}
