import { Injectable } from '@angular/core';

import * as cars from '../../../db/cars.json';
import {
  AllBrandsModel,
  BrandSeriesModel,
  CarItemModel
} from '@models/index';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private carsData: AllBrandsModel[] = cars.cars;

  public getAllBrands(): AllBrandsModel[] {
    if (this.carsData) {
      return this.carsData;
    }
  }

  public getSeries(brand: string): BrandSeriesModel[] {
    return this.carsData.find(el => el.brandName.toLowerCase() === brand).series;
  }

  public getCars(data: {brand: string, series: string}): CarItemModel[] {
    const idx = this.carsData.findIndex(el => el.brandName.toLowerCase() === data.brand.toLowerCase());
    if (idx > -1) {
      return  this.carsData[idx].series.find(el => el.seriesName.toLowerCase() === data.series.toLowerCase()).carsList;
    }
  }
}
