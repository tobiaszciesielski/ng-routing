import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PizzasComponent } from './pizzas.component';

const routes: Routes = [
  {
    path: '',
    component: PizzasComponent,
    canActivate: [
      () => {
        console.log('[GUARD] Lazy loaded child');
        return true;
      },
    ],
    canMatch: [
      () => {
        console.log('[CAN MATCH] Lazy loaded child');
        return true;
      },
    ],
    resolve: [
      () => {
        console.log('[RESOLVER] Lazy loaded child');
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
