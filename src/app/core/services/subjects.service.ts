import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CarItemModel } from '@models/index';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  public carItem$: Subject<CarItemModel> = new Subject<CarItemModel>();
}
