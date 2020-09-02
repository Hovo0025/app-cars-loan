import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SubjectsService } from '@services/index';
import {
  AllBrandsModel,
  BrandSeriesModel,
  CarItemModel
} from '@models/index';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss']
})
export class CarItemComponent implements OnInit {
  @Input() allBrandData: AllBrandsModel[] = [];
  @Input() carSeriesData: BrandSeriesModel[] = [];
  @Input() carsListData: CarItemModel[] = [];

  constructor(private router: Router,
              private subjectsService: SubjectsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  /**
   * calls from template
   * navigates to selected category
   *
   * @param name type `string`
   *
   * @return `null`
   */
  public onNavigate(name: string): void {
    this.router.navigate([name], {relativeTo: this.activatedRoute});
  }

  /**
   * calls from template
   * emit carItem value to carItem$ subject
   *
   * @param car type `CarItemModel`
   *
   * @return `null`
   */
  public onEmitCarData(car: CarItemModel): void {
    this.subjectsService.carItem$.next(car);
  }
}
