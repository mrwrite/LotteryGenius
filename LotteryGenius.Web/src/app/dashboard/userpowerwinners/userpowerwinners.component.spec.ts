import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpowerwinnersComponent } from './userpowerwinners.component';

describe('UserpowerwinnersComponent', () => {
  let component: UserpowerwinnersComponent;
  let fixture: ComponentFixture<UserpowerwinnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpowerwinnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpowerwinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
