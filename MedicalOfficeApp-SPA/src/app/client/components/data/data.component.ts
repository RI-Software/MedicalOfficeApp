import {Component, OnInit, HostListener, OnDestroy} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  FormControl
} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {PreventMoveBackService} from 'src/app/core/services/prevent-move-back.service';
import {BaseFormComponent} from 'src/app/shared/components/base-form/base-form.component';
import {select, Store} from '@ngrx/store';
import {nextBtnAvailability, step} from '../../store/stepStore/actions/step.actions';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {selectIsNextBtnPressed} from '../../store/stepStore/selectors/step.selectors';
import {setClient} from '../../store/clientStore/actions/client.actions';
import {Client} from '../../../shared/models/Client';
import {selectClient} from '../../store/clientStore/selectors/client.selectors';

@Component({
  selector: 'app-data-adult',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent extends BaseFormComponent implements OnInit, OnDestroy {
  //#region settings and defaults

  minAge = 0;
  maxAge = 120;
  minMonths = 1;
  maxMonths = 11;
  minNameLength = 2;
  maxNameLength = 15;

  //#region errorMessages

  //#region name
  incorrectNameError = 'Incorrect name';
  nameIsRequiredError = 'Name is required';
  nameMinLengthError = 'Name must be at least 2 characters';
  nameMaxLengthError = 'Name cannot exceed 15 characters';
  //#endregion

  //#region surname
  incorrectSurnameError = 'Incorrect surname';
  surnameIsRequiredError = 'Surname is required';
  surnameMinLengthError = 'Surname must be at least 2 characters';
  surnameMaxLengthError = 'Surname cannot exceed 15 characters';
  //#endregion

  //#region years
  ageIsRequiredError = 'Age is required';
  ageMinError = 'Age should be positive';
  ageMaxError = 'Choose your real age';
  //#endregion

  //#region months
  monthsMinError = 'Should be greater than 0';
  monthsMaxError = 'Should be less than 12';
  monthsAreRequiredError = 'Months are required';
  //#endregion

  //#region email
  incorrectEmailError = 'Provide correct email';
  emailIsRequiredError = 'Email is required';
  //#endregion

  //#region phone
  incorrectPhoneError = 'Privide correct phone number(BLR or PL)';
  phoneIsRequiredError = 'Phone is required';
  //#endregion

  //#endregion

  //#region placeholders
  namePlaceholder = 'Patient Name';
  surnamePlaceholder = 'Patient Surname';
  agePlaceholder = 'Age';
  monthsPlaceholder = 'Months';
  emailPlaceholder = 'Email';
  phonePlaceholder = 'Phone';
  //#endregion

  //#region regexes
  private regexPatternForName = /^(([A-Z]{0,1}[a-z]*)|([А-Я]{0,1}[а-я]*))( {0,5}?)$/;
  private regexPatternForEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  private regexPatternForPhoneNumber = /^\+?(((375|80)(((17|25|33|44)[0-9]{7})|(29([1-3]|[5-9])[0-9]{6})))|(48[1-9]{9}))$/;
  //#endregion

  //#endregion

  form: FormGroup;

  unsubscribe$: Subject<void> = new Subject<void>();

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = true;
  }

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private preventMoveBackService: PreventMoveBackService,
    private store: Store) {
    super();
  }

  ngOnInit() {
    this.preventMoveBackService.preventBackButton();
    this.setUpRegisterForm();
    this.form.statusChanges.subscribe((status: string) => {
      this.onStatusChange(status);
    });

    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectIsNextBtnPressed)
    ).subscribe((isPressed: boolean) => {
      if (isPressed) {
        const formValue = this.form.value;
        const client: Client = {
          name: formValue.name,
          surname: formValue.surname,
          age: formValue.age.years,
          months: formValue.age?.months,
          email: formValue.email,
          phone: formValue.phone
        };
        this.store.dispatch(setClient({client}));
        this.store.dispatch(step({path: 'agreements'}));
      }
    });

    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectClient)
    ).subscribe((client) => {
      if (client) {
        this.form.patchValue({
          name: client.name,
          surname: client.surname,
          age: {
            years: client.age,
            months: client.months,
          },
          email: client.email,
          phone: client.phone
        });
        this.onStatusChange('VALID');
      }
    });
  }

  private setUpRegisterForm(): void {
    this.createRegisterForm();
    this.form.get('age.months').disable();
  }

  private createRegisterForm(): void {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(this.minNameLength),
          Validators.maxLength(this.maxNameLength),
          this.customValidityCheck({pattern: this.regexPatternForName, msg: this.incorrectNameError})
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
          this.customValidityCheck({pattern: this.regexPatternForName, msg: this.incorrectSurnameError})
        ],
      ],
      age: this.formBuilder.group({
        years: [
          '',
          [
            Validators.required,
            Validators.min(this.minAge),
            Validators.max(this.maxAge)
          ],
        ],
        months: [
          '',
          [
            Validators.required,
            Validators.min(this.minMonths),
            Validators.max(this.maxMonths)
          ]
        ],
      }, {validator: this.ageValidator}),
      email: [
        '',
        [
          Validators.required,
          this.customValidityCheck({pattern: this.regexPatternForEmail, msg: this.incorrectEmailError})
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          this.customValidityCheck({pattern: this.regexPatternForPhoneNumber, msg: this.incorrectPhoneError})
        ]
      ],
    });
  }

  private ageValidator(formGroup: FormGroup): null {
    if (formGroup.controls.years.value === 0) {
      if (formGroup.controls.months.disabled) {
        formGroup.controls.months.enable();
      }
    }

    if (formGroup.controls.years.value && formGroup.controls.years.value !== 0) {
      if (formGroup.controls.months.value !== null) {
        formGroup.controls.months.setValue(null);
      }

      if (!formGroup.controls.months.disabled) {
        formGroup.controls.months.disable();
      }
    }

    return null;
  }

  private customValidityCheck(data: any): ValidatorFn {
    return (control: FormControl) => {
      const regexPattern: RegExp = data.pattern;
      if (control.value && !control.value.match(regexPattern)) {
        return {
          customError: {
            errorMsg: data.msg,
          }
        };
      }
      return null;
    };
  }

  onStatusChange(status: string) {
    if (status === 'VALID') {
      this.store.dispatch(nextBtnAvailability({isAvailable: true}));
      return;
    }
    this.store.dispatch(nextBtnAvailability({isAvailable: false}));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
