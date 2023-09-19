import { NgModule } from '@angular/core';
import { PizzasComponent } from './pizzas.component';
import { PizzasRoutingModule } from './pizzas-routing.module';

@NgModule({
  imports: [PizzasRoutingModule],
  exports: [],
  declarations: [PizzasComponent],
  providers: [],
})
export class PizzasModule {}
