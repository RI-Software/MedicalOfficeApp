import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Router } from '@angular/router';
import { TimeComponent } from '../components/time/time.component';
import { Helpers } from '../shared/helpers';
import { steps } from '../shared/models/stepModels';
import { MoveType } from '../shared/models/MoveTypeEnum';

@Injectable({
  providedIn: 'root',
})
export class StepService{

  /**
   * [param description]
   * @param stepCanBeActivated is a component that can be
   * activated at the moment.
   */
  stepCanBeActivated: Type<any> = TimeComponent;

  /**
   * [param description]
   * @param moveType is used only by StepControlComponent.
   * Better solution to tell StepControlComponent that it
   * needs to set up btns availability can be found.
   */
  moveType = new BehaviorSubject<MoveType>(MoveType.None);

  /**
   * [param description]
   * @param canMove exists with only one purpose:
   * not to call canActivateShared method two times
   * each time user can go to enother page.
   * Is used only by ActivateGuard.
   */
  canMove = false;

  private minStepValue = 0;
  private maxStepValue = steps.length - 1;

  currentStep = new BehaviorSubject<number>(this.minStepValue);

  /**
   * [param description]
   * @param callbackParams is used as callback params.
   */
  private callbackParams: any;
  /**
   * @description
   * Method that is set up by component in order to call it
   * when Step() is called (when user press "next" or "previous"
   * btns.)
   * @param params: callback params.
   * @returns value that shows can either step be done or not.
   */
  private callback: (params: any) => Promise<boolean>;



  constructor(private router: Router) {
    this.initialSetUp();
  }

  /**
   * @description
   * Makes step(navigate user to specific
   * component specified in StepPreparing() method).
   */
  public async Step(): Promise<void> {
    const valuetoBeSet = steps.findIndex((step) => {
      return this.stepCanBeActivated === step.route.component;
    });

    this.canMove = this.canBeSet(valuetoBeSet);

    const isCallbackSuccess = this.callback != null ? await this.callback(this.callbackParams) : true;

    if (this.canMove && isCallbackSuccess ){
      this.currentStep.next(valuetoBeSet);
      this.moveType.next(MoveType.None);
      this.navigateUser();
    }
  }

  /**
   * @description
   * Method should be called by component to allow user
   * make step to another specific component.
   * @param componentToNavigate specify component to which
   * user will be navigated after Step() method is called.
   * @param moveType specify 'fictitious direction' in order
   * to 'unblock' next or previous btn in StepContolComponent.
   */
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

  disableTheStep(): void {
    this.StepPreparing(TimeComponent, MoveType.None);
  }

  /**
   * @description
   * Is internally used by StepService to check component
   * can be activated.
   * @param valueToBeSet this is an index in the array of
   * steps. Specifies the index of the component that will
   * be checked for activation.
   * @returns can be current step updated or not.
   */
  private canBeSet(valueToBeSet: number): boolean {
    const canActivate = Helpers.canActivateShared(steps[valueToBeSet].route.path, this.stepCanBeActivated);
    const isInBound = valueToBeSet >= this.minStepValue && valueToBeSet <= this.maxStepValue;
    const canMoveNext = this.moveType.value !== MoveType.None;
    return canActivate && isInBound && canMoveNext;
  }

  /**
   * @description
   * Is used once by StepService in order to allow
   * first component be activated by ActivateGuard.
   */
  private initialSetUp(): void {
    this.StepPreparing(this.stepCanBeActivated);
    this.Step();
  }

  private navigateUser(): void {
    this.router.navigate(['signup/' + steps[this.currentStep.value].route.path]);
  }
}
