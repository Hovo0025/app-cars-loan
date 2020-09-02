import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarsListComponent } from './cars-list/cars-list.component';

const routes: Routes = [
  {
    path: '',
    component: CarsListComponent,
  },
  {
    path: ':brand',
    component: CarsListComponent,
  },
  {
    path: ':brand/:series',
    component: CarsListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule {
}
