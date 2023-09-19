import { NgModule } from '@angular/core';

import { Route, Router, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/pizzas/pizzas.module').then((m) => m.PizzasModule),
    canActivate: [
      () => {
        console.log('[canActivate] Parent');
        return true;
      },
    ],
    canActivateChild: [
      () => {
        console.log('[canActivateChild] Parent');
        return true;
      },
    ],
    canMatch: [
      () => {
        console.log('[canMatch] Parent');
        return true;
      },
    ],
    resolve: [
      () => {
        console.log('[resolve] Parent');
        return true;
      },
    ],
    canDeactivate: [
      () => {
        console.log('[canDeactivate] Parent');
        return true;
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule {}
