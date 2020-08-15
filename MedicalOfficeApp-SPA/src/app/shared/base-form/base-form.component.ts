import { Component, OnInit } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';

@Component({
 template: ''
})
export class BaseFormComponent {

  form: FormGroup;

  getControl(name: string){
    return this.form.get(name);
  }

  isValid(name: string){
    const control = this.getControl(name);
    return control && control.valid;
  }

  isChanged(name: string){
    const control = this.getControl(name);
    return control && (control.dirty || control.touched);
  }

  hasError(name: string){
    const control = this.getControl(name);
    return this.isChanged(name) && control.invalid;
  }
}
