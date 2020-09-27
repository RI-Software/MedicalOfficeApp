import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Store} from '@ngrx/store';
import {selectPreregisterStatus, selectRegisterStatus} from '../../store/clientStore/selectors/client.selectors';
import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ActionStatusesEnum} from '../../shared/models/ActionStatusesEnum';
import {ClientService} from '../../services/client.service';
import {step} from '../../store/stepStore/actions/step.actions';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {

  deadline: number | string;
  canDisplayCountdown = false;
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private ngZone: NgZone,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    combineLatest([
      this.store.select(selectPreregisterStatus),
      this.store.select(selectRegisterStatus)
    ]).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(([preregisterStatus, registerStatus]) => {
      if (preregisterStatus === ActionStatusesEnum.Done && registerStatus === ActionStatusesEnum.Default) {
        this.canDisplayCountdown = true;
        this.deadline = this.authService.getTokenExpirationTime().getTime();
      } else {
        this.canDisplayCountdown = false;
        this.deadline = null;
      }
    });
  }

  deleteUser(): void {
    this.clientService.freeRecord();
    this.ngZone.run(() => {
      this.store.dispatch(step({path: 'time'}));
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
