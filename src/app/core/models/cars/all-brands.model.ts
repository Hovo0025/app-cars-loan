import { BrandSeriesModel } from '@models/index';

export interface AllBrandsModel {
  level: number;
  cover: string;
  brandName: string;
  series: BrandSeriesModel[];
}
