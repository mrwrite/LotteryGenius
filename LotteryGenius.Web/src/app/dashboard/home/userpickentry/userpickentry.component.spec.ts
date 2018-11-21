import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpickentryComponent } from './userpickentry.component';

describe('UserpickentryComponent', () => {
  let component: UserpickentryComponent;
  let fixture: ComponentFixture<UserpickentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpickentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpickentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
