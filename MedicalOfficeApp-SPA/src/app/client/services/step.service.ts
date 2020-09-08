import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { TimeComponent } from '../components/time/time.component';
import { MoveType } from '../shared/models/MoveTypeEnum';
import { Step } from '../shared/models/Step';
import { DataComponent } from '../components/data/data.component';
import { AgreementsComponent } from '../components/agreements/agreements.component';
import { SaveComponent } from '../components/save/save.component';
import { DoneComponent } from '../components/done/done.component';
import { ClientServiceModule } from './client-service.module';

@Injectable({
  providedIn: ClientServiceModule
})
export class StepService {
  steps: Step[] = [
    { path: 'time', stepName: 'Time', component: TimeComponent, icon: 'clock-circle' },
    { path: 'data', stepName: 'Data', component: DataComponent, icon: 'solution' },
    { path: 'agreements', stepName: 'Agreements', component: AgreementsComponent, icon: 'file-text' },
    { path: 'save', stepName: 'Save', component: SaveComponent, icon: 'save' },
    { path: 'done', stepName: 'Done', component: DoneComponent, icon: 'check', },
  ];

  stepCanBeActivated: Type<any> = TimeComponent;

  moveType = new BehaviorSubject<MoveType>(MoveType.None);

  currentStep = new BehaviorSubject<number>(0);

  private callbackParams: any;

  private callback: (params: any) => Promise<boolean>;

  constructor(private router: Router) {
    this.initialSetUp();
  }

  public async Step(): Promise<void> {
    const valuetoBeSet = this.steps.findIndex((step) => {
      return this.stepCanBeActivated === step.component;
    });

    const canMove = this.moveType.value !== MoveType.None;
    const isCallbackSuccess = this.callback != null ? await this.callback(this.callbackParams) : true;

    if (canMove && isCallbackSuccess){
      this.currentStep.next(valuetoBeSet);
      this.moveType.next(MoveType.None);
      this.navigateUser();
    }
  }

  public StepPreparing(
    componentToNavigate: Type<any>,
    moveType: MoveType = MoveType.MoveNext,
    params: any = null,
    callback: (params: any) => Promise<boolean> = null): void {

      this.callbackParams = params;
      this.callback = callback;

      this.stepCanBeActivated = componentToNavigate;
      this.moveType.next(moveType);
  }

  public disableTheStep(): void {
    this.StepPreparing(TimeComponent, MoveType.None);
  }

  private initialSetUp(): void {
    this.StepPreparing(this.stepCanBeActivated);
    this.Step();
  }

  private navigateUser(): void {
    this.router.navigate(['signup/' + this.steps[this.currentStep.value].path]);
  }
}
