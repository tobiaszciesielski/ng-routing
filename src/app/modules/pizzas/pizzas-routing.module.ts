import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PizzasComponent } from './pizzas.component';

const routes: Routes = [
  {
    path: '',
    component: PizzasComponent,
    canActivate: [
      () => {
        console.log('[canActivate] Lazy loaded child');
        return true;
      },
    ],
    canActivateChild: [
      () => {
        console.log('[canActivateChild] Lazy loaded child');
        return true;
      },
    ],
    canMatch: [
      () => {
        console.log('[canMatch] Lazy loaded child');
        return true;
      },
    ],
    resolve: [
      () => {
        console.log('[resolve] Lazy loaded child');
        return true;
      },
    ],
    canDeactivate: [
      () => {
        console.log('[canDeactivate] Lazy loaded child');
        return true;
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class PizzasRoutingModule {}
