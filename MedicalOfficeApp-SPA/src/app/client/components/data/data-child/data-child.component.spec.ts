/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DataChildComponent } from './data-child.component';

describe('DataChildComponent', () => {
  let component: DataChildComponent;
  let fixture: ComponentFixture<DataChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
