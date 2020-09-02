import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';

import { CarsRoutingModule } from './cars-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../../core/material/material.module';
import { CarsListComponent } from './cars-list/cars-list.component';
import { CarItemComponent } from './car-item/car-item.component';
import { CarItemDialogComponent } from './modals/car-item-dialog.component';

@NgModule({
  declarations: [
    CarsListComponent,
    CarItemComponent,
    CarItemDialogComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    MaterialModule,
    SharedModule,
    Ng5SliderModule,
  ],
  entryComponents: [
    CarItemDialogComponent,
  ]
})
export class CarsModule { }
