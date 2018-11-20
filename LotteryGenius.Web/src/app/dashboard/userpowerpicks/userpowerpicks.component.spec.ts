import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpowerpicksComponent } from './userpowerpicks.component';

describe('UserpowerpicksComponent', () => {
  let component: UserpowerpicksComponent;
  let fixture: ComponentFixture<UserpowerpicksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpowerpicksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpowerpicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
