import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-data-adult',
  templateUrl: './data-adult.component.html',
  styleUrls: ['./data-adult.component.scss'],
})
export class DataAdultComponent implements OnInit {
  @Output() cancelAdultRegister = new EventEmitter();
  regexPatternForName = /^[a-zA-Zа-яА-Я]*$/;
  regexPatternForEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  regexPatternForPhoneNumber = /^\+?(((375|80)(((17|25|33|44)[0-9]{7})|(29([1-3]|[5-9])[0-9]{6})))|(48[1-9]{9}))$/;
  adultRegisterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    this.adultRegisterForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
          this.customValidityCheck({pattern: this.regexPatternForName, msg: 'Only a-z characters are allowed'})
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
          this.customValidityCheck({pattern: this.regexPatternForName, msg: 'Only a-z characters are allowed'})
        ],
      ],
      age: ['',
        [
          Validators.required,
          Validators.min(15),
          Validators.max(120),
        ]
      ],
      email: [
        '',
        [
           Validators.required,
           this.customValidityCheck({pattern: this.regexPatternForEmail, msg: 'Provide correct email'})
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          this.customValidityCheck({pattern: this.regexPatternForPhoneNumber, msg: 'Privide correct phone number(BLR or PL)'})
        ]
      ],
    });
  }

  customValidityCheck(data: any): ValidatorFn {
    return (control: FormControl) => {
      const regexPattern: RegExp = data.pattern;
      const matches = control.value.match(regexPattern);
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

  register() {
    // TODO: implement method
    console.log(this.adultRegisterForm.value);
  }

  cancel(): void {
    this.cancelAdultRegister.emit();
  }
}
