import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { RoutingComponent } from './components/routing/routing.component';
import { FormComponent } from './components/form/form.component';
import { ComplexStateComponent } from './components/complex-state/complex-state.component';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule, AppRoutingModule],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
