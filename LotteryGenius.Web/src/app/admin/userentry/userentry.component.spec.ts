import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserentryComponent } from './userentry.component';

describe('UserentryComponent', () => {
  let component: UserentryComponent;
  let fixture: ComponentFixture<UserentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
