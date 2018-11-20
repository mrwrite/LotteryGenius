import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermegapicksComponent } from './usermegapicks.component';

describe('UsermegapicksComponent', () => {
  let component: UsermegapicksComponent;
  let fixture: ComponentFixture<UsermegapicksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermegapicksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermegapicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
