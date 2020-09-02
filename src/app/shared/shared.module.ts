import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { InfoDialogComponent } from '@shared/modals/info-dialog/info-dialog.component';
import { HeaderComponent } from '@components/header/header.component';

@NgModule({
  declarations: [
    InfoDialogComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [
    CommonModule,
    InfoDialogComponent,
    HeaderComponent
  ],
  entryComponents: [
    InfoDialogComponent,
  ],
})
export class SharedModule {
}
