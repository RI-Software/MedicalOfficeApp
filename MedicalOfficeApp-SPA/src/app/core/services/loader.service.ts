import {Injectable} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private spinner: NgxSpinnerService) {
  }

  showLoader(spinnerName: string) {
    this.spinner.show(spinnerName);
  }

  hideLoader(spinnerName: string) {
    this.spinner.hide(spinnerName);
  }
}
