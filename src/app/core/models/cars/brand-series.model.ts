import { CarItemModel } from '@models/index';

export interface BrandSeriesModel {
  level: number;
  seriesName: string;
  seriesCover: string;
  carsList: CarItemModel[];
}
