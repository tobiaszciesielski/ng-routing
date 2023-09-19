import { NgModule } from '@angular/core';

import { Route, Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/pizzas/pizzas.module').then((m) => m.PizzasModule),

    canActivate: [
      () => {
        console.log('[GUARD] Parent');
        return true;
      },
    ],
    canMatch: [
      () => {
        console.log('[CAN MATCH] Parent');
        return true;
      },
    ],
    resolve: [
      () => {
        console.log('[RESOLVER] Parent');
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
