import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, of } from 'rxjs';
import { PizzaService } from 'src/app/services/pizza.service';

export const pizzaMakerAliveGuard: CanActivateFn = (route) => {
  const pizzaService = inject(PizzaService);
  const router = inject(Router);

  return pizzaService
    .checkIfPizzaMakerAlive(route.params['pizzaMakerId'])
    .pipe(
      map((pizzaMakerAlive) =>
        pizzaMakerAlive ? true : router.createUrlTree(['no-pizza-today']),
      ),
    );
};
