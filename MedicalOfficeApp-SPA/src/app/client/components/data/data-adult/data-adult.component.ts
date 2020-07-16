import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-adult',
  templateUrl: './data-adult.component.html',
  styleUrls: ['./data-adult.component.scss']
})
export class DataAdultComponent implements OnInit {
  @Output() cancelAdultRegister = new EventEmitter();

  adultRegisterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    this.adultRegisterForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  register() {
    // TODO: implement method
    console.log(this.adultRegisterForm.value);
  }

  cancel(): void {
    this.cancelAdultRegister.emit();
  }
}
