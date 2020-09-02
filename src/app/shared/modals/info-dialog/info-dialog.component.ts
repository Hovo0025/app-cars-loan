import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  constructor(private router: Router,
              public dialogRef: MatDialogRef<InfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {title: string, infoTxt: string, btnTxt: string}) {
  }

  ngOnInit(): void {
  }

  /**
   * calls from template
   * navigates to main page
   *
   * @return `null`
   */
  public onNavigateMainPage(): void {
    this.router.navigate(['/']);
    this.dialogRef.close();
  }
}
