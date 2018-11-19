import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerpicksComponent } from './powerpicks.component';

describe('PowerpicksComponent', () => {
  let component: PowerpicksComponent;
  let fixture: ComponentFixture<PowerpicksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerpicksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerpicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
