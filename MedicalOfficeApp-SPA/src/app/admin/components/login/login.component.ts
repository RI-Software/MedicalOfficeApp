import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {BaseFormComponent} from 'src/app/shared/components/base-form/base-form.component';
import {Store} from '@ngrx/store';
import {loginAdmin} from '../../store/adminStore/actions/admin.actions';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    const formValue = this.form.value;
    this.store.dispatch(loginAdmin({username: formValue.login, password: formValue.password}));
  }
}
