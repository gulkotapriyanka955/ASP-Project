import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private location: Location, private snackBar: MatSnackBar) { }

  // go to previous page
  back() {
    this.location.back();
  }

  // success notification box
  openSnackBar(message: any, action: any) {
    this.snackBar.open(message, action, { duration: 3000 , verticalPosition: 'top', panelClass: ['style-success']}
    );
  }

  // error notification box
  public openErrorSnackbar(message: any, action: any) {
    this.snackBar.open(message, action,  { duration: 3000 , verticalPosition: 'top', panelClass: ['style-error']});
  }
}
