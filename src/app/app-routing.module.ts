import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PizzaMakerComponent } from './components/guard/resolver.component';
import { pizzaMakerAliveGuard } from './components/guard/pizza-maker';
import { ComplexStateComponent } from './components/complex-state/complex-state.component';

const routes: Routes = [
  {
    path: 'manual-subscribe',
    loadComponent: () =>
      import('./components/manual-subscribe/manual-subscribe.component').then(
        (c) => c.ManualSubscribeComponent,
      ),
  },
  {
    path: 'routing/:pizzaId',
    loadComponent: () =>
      import('./components/routing/routing.component').then(
        (c) => c.RoutingComponent,
      ),
  },
  {
    path: 'form/:pizzaId',
    loadComponent: () =>
      import('./components/form/form.component').then(
        (c) => c.PizzaWrapperComponent,
      ),
  },
  {
    path: 'pizza-maker/:pizzaMakerId',
    component: PizzaMakerComponent,
    canActivate: [pizzaMakerAliveGuard],
  },
  {
    path: 'complex-state',
    component: ComplexStateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule {}
