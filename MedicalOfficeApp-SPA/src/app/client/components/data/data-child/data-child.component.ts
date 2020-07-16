import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-child',
  templateUrl: './data-child.component.html',
  styleUrls: ['./data-child.component.scss']
})
export class DataChildComponent implements OnInit {
  @Output() cancelChildRegister = new EventEmitter();

  childtRegisterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    this.childtRegisterForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      months: [''],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  register() {
    // TODO: implement method
    console.log(this.childtRegisterForm.value);
  }

  cancel(): void {
    this.cancelChildRegister.emit();
  }
}
