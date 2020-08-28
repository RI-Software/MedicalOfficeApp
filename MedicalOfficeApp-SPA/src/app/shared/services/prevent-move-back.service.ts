import { Injectable } from '@angular/core';
import { LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PreventMoveBackService {

  constructor(private locationStrategy: LocationStrategy) { }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }
}
