import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza-maker',
  templateUrl: './resolver.component.html',
  standalone: true,
  imports: [RouterModule],
})
export class PizzaMakerComponent implements OnInit {
  public pizzaService = inject(PizzaService);
  public router = inject(Router);
  public route = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.checkIfPizzaMakerIsAlive();
  }

  public checkIfPizzaMakerIsAlive() {
    const pizzaMakerId = this.route.snapshot.params['pizzaMakerId'];

    this.pizzaService
      .checkIfPizzaMakerAlive(pizzaMakerId)
      .subscribe((pizzaMakerAlive: boolean) => {
        if (pizzaMakerAlive === false) {
          this.router.navigate(['no-pizza-today']);
        }
      });
  }
}
