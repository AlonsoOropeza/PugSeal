import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinner: NgxSpinnerService) { }

  public async showSpinner() {
    return this.spinner.show();
  }

  public async hideSpinner() {
    return this.spinner.hide();
  }
}
