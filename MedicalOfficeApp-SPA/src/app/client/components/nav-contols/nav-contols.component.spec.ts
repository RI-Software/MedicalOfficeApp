import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavContolsComponent } from './nav-contols.component';

describe('NavContolsComponent', () => {
  let component: NavContolsComponent;
  let fixture: ComponentFixture<NavContolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavContolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavContolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
