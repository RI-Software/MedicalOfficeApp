import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsControlsComponent } from './records-controls.component';

describe('RecordsControlsComponent', () => {
  let component: RecordsControlsComponent;
  let fixture: ComponentFixture<RecordsControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
