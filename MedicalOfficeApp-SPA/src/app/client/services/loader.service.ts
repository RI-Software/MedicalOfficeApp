import {Injectable} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ClientServiceModule} from './client-service.module';
import {combineLatest} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectIsMainLoaderOn, selectIsTimeLoaderOn} from '../store/sharedStore/selectors/shared.selectors';

@Injectable({
  providedIn: ClientServiceModule
})
export class LoaderService {

  constructor(
    private spinner: NgxSpinnerService,
    private store: Store) {
    combineLatest([
      this.store.select(selectIsMainLoaderOn),
      this.store.select(selectIsTimeLoaderOn)
    ]).subscribe(([isMainLoaderOn, isTimeLoaderOn]) => {
      if (isMainLoaderOn) {
        this.showLoader('mainClientSpinner');
        this.hideLoader('timeBtnsSpinner');
        return;
      } else {
        this.hideLoader('mainClientSpinner');
      }

      if (isTimeLoaderOn) {
        this.showLoader('timeBtnsSpinner');
        return;
      } else {
        this.hideLoader('timeBtnsSpinner');
      }
    });
  }

  private showLoader(spinnerName: string) {
    this.spinner.show(spinnerName);
  }

  private hideLoader(spinnerName: string) {
    this.spinner.hide(spinnerName);
  }
}
