import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CarItemDialogComponent } from '../modals/car-item-dialog.component';
import { InfoDialogComponent } from '@shared/modals/info-dialog/info-dialog.component';
import { CarsService, SubjectsService } from '@services/index';
import {
  AllBrandsModel,
  BrandSeriesModel,
  CarItemModel
} from '@models/index';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit, OnDestroy {
  public allBrands: AllBrandsModel[] = [];
  public brandSeries: BrandSeriesModel[] = [];
  public carsList: CarItemModel[] = [];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute,
              private _location: Location,
              private carsService: CarsService,
              private subjectsService: SubjectsService,
              private matDialog: MatDialog) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.series) {
        this.onGetCarsList(params);
      }  else if (params.brand) {
        this.onGetBrandSeries(params.brand);
      } else {
        this.onGetAllBrands();
      }
    });
  }

  ngOnInit(): void {
    this.subjectsService.carItem$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((carItem: CarItemModel) => {
        this.callCarItemDialog(carItem);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  /**
   * calls getAllBrands method for getting all brands
   *
   * @return `null`
   */
  public onGetAllBrands(): void {
    const data = this.carsService.getAllBrands();
    if (data) {
      this.allBrands = data;
    }
  }

  /**
   * calls getSeries method for getting brand series
   *
   * @param brand type `string`
   *
   * @return `null`
   */
  public onGetBrandSeries(brand: string): void {
    const data = this.carsService.getSeries(brand.toLowerCase());
    if (data) {
      this.brandSeries = data;
    }
  }

  /**
   * calls getCars method for getting cars list
   *
   * @param paramsData type `object`
   *
   * @return `null`
   */
  public onGetCarsList(paramsData) {
    const data = this.carsService.getCars(paramsData);
    if (data) {
      this.carsList = data;
    }
  }

  /**
   * open CarItemDialogComponent modal
   * calls callInfoDialog modal if user send a request
   *
   * @param carItem type `CarItemModel`
   *
   * @return `null`
   */
  public callCarItemDialog(carItem: CarItemModel) {
    const dialogRef = this.matDialog.open( CarItemDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: ['car-item-dialog'],
      data: carItem
    });
    dialogRef.afterClosed().subscribe((requestSend: boolean) => {
      if (requestSend) {
        setTimeout(() => {
          this.callInfoDialog();
        }, 300);
      }
    });
  }

  /**
   * open InfoDialogComponent modal
   *
   * @return `null`
   */
  public callInfoDialog() {
    this.matDialog.open( InfoDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: ['info-dialog'],
      data: {
        title: 'Ваша заявка отправлена!',
        infoTxt: 'Спасибо за обращение! Мы свяжемся с вами в  ближайшее время',
        btnTxt: 'Вернутся в каталог',
      }
    });
  }

  /**
   * calls from template
   * navigates back
   *
   * @return `null`
   */
  public onNavigateBack(): void {
    this._location.back();
  }
}
