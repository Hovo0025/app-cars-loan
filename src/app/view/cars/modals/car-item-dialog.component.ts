import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Options } from 'ng5-slider';

import { CarItemModel } from '@models/index';
import { CreditOptions } from '@constants/index';

@Component({
  selector: 'app-car-item-dialog',
  templateUrl: './car-item-dialog.component.html',
  styleUrls: ['./car-item-dialog.component.scss']
})
export class CarItemDialogComponent implements OnInit {
  public carItem: CarItemModel;
  public initialFeeMinValue: number;
  public payMonthlySliderMinValue = 0;
  public creditTermSliderMinValue: number;
  public initialFeeSliderOptions: Options;
  public payMonthlySliderOptions: Options;
  public creditTermSliderOptions: Options;
  public initialFeePercent = CreditOptions.initialFeePercent;
  public feePercent = CreditOptions.feePercent;
  public carPrice: number;
  public pmt: number;

  constructor(public dialogRef: MatDialogRef<CarItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CarItemModel) {
    this.carItem = this.data;
  }

  ngOnInit(): void {
    this.calculateCreditOptions();
    this.sliderOptionSet();
  }

  /**
   * credit options initial value calculation
   *
   * @return null
   */
  public calculateCreditOptions(): void {
    this.carPrice = this.carItem.priceData.price - this.carItem.priceData.discount;
    this.initialFeeMinValue = (this.carPrice * CreditOptions.initialFeePercent) / 100;
    this.creditTermSliderMinValue = CreditOptions.creditTermsMonthMin;
    this.pmt = this.calculatePMT(this.carPrice, this.feePercent, this.creditTermSliderMinValue);
  }

  /**
   * calls from template
   * output ng5slider slider change event
   *
   * @param e type @event
   *
   * @return null
   */
  public onValueChanges(e) {
    this.initialFeePercent = (100 * this.initialFeeMinValue) / this.carPrice;
    this.pmt = this.calculatePMT(this.carPrice, this.feePercent, this.creditTermSliderMinValue);
  }

  /**
   * calls from template
   * output ng5slider slider change end event
   *
   * @param e type @event
   * @param option type string
   *
   * @return null
   */
  public onUserChangeEnd(e, option) {
    if (option === 'credit-term') {
      this.payMonthlySliderMinValue = (e.value / 12) * 1000;
    } else {
      const monthCount = (this.payMonthlySliderMinValue / 1000) * 12;
      if (monthCount <= CreditOptions.creditTermsMonthMax) {
        this.creditTermSliderMinValue = monthCount;
      }
    }
  }

  /**
   * ng5slider basic option set
   *
   * @return null
   */
  public sliderOptionSet(): void {
    this.initialFeeSliderOptions  = {
      floor: this.initialFeeMinValue,
      animate: false,
      ceil: this.carPrice,
      step: (this.carPrice * CreditOptions.feePercentStep) / 100,
    };
    this.payMonthlySliderOptions  = {
      floor: 1000,
      animate: false,
      ceil: CreditOptions.creditTermsMonthMax * 1000 / 12,
      step: 1000,
    };
    this.creditTermSliderOptions = {
      floor: this.creditTermSliderMinValue,
      animate: false,
      ceil: CreditOptions.creditTermsMonthMax,
      step: CreditOptions.creditTermsMonthMin,
    };
  }

  /**
   * calls from template
   * close dialog and path true
   *
   * @return `null`
   */
  public onSendRequest() {
    this.dialogRef.close(true);
  }

  /**
   * PMT calculation
   * calls method `PMT` for calculation pmt value
   *
   * @param loanAmount type `number`
   * @param annualInterestRate type `number`
   * @param months type `number`
   *
   * @return `number`
   */
  public calculatePMT(loanAmount, annualInterestRate, months): number {
    const i = annualInterestRate / 1200;
    const n = months;
    const p = loanAmount - this.initialFeeMinValue;
    const pmt = this.PMT(i, n, -p);
    return + pmt.toFixed(2) * 100 / 100;
  }

  /**
   * method for calculating pmt
   * @param i type `number`
   * @param n type `number`
   * @param p type `number`
   *
   * @return `number`
   */
  private PMT(i, n, p): number {
    return i * p * Math.pow((1 + i), n) / (1 - Math.pow((1 + i), n));
  }
}
