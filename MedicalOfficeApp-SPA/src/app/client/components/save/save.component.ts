import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../../../shared/models/Client';
import {PreventMoveBackService} from 'src/app/core/services/prevent-move-back.service';
import {AuthService} from '../../../core/services/auth.service';
import {DateTime} from '../../shared/models/Date&Times';
import {select, Store} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';
import {combineLatest, Subject} from 'rxjs';
import {selectIsNextBtnPressed} from '../../store/stepStore/selectors/step.selectors';
import {clientRegister} from '../../store/clientStore/actions/client.actions';
import {selectClient, selectRegisterStatus} from '../../store/clientStore/selectors/client.selectors';
import {nextBtnAvailability, step} from '../../store/stepStore/actions/step.actions';
import {ActionStatusesEnum} from '../../shared/models/ActionStatusesEnum';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit, OnDestroy {

  client: Client;
  dateTime: DateTime;

  unsubscribe$: Subject<void> = new Subject<void>();

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = true;
  }

  constructor(
    private preventMoveBackService: PreventMoveBackService,
    private authService: AuthService,
    private clientService: ClientService,
    private store: Store) {
  }

  ngOnInit() {
    this.preventMoveBackService.preventBackButton();

    const token = this.authService.getDecodedToken();
    this.dateTime = {
      date: token.date,
      time: token.time
    };

    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectClient)
    ).subscribe((client: Client) => {
      this.client = client;
    });

    combineLatest([
        this.store.select(selectIsNextBtnPressed),
        this.store.select(selectRegisterStatus)
    ]).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(([isPressed, registerStatus]) => {
      if (isPressed) {
        if (registerStatus === ActionStatusesEnum.Done) {
          this.store.dispatch(step({path: 'done'}));
        } else {
        this.store.dispatch(clientRegister());
        }
      }
    });

    this.store.dispatch(nextBtnAvailability({isAvailable: true}));
  }

  dateTimeEditBtnPressed() {
    this.clientService.freeRecord();
    this.store.dispatch(step({path: 'time'}));
  }

  clientEditBtnPressed() {
    this.store.dispatch(step({path: 'data'}));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
