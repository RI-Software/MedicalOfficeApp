/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StepControlComponent } from './step-control.component';

describe('StepControlComponent', () => {
  let component: StepControlComponent;
  let fixture: ComponentFixture<StepControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
