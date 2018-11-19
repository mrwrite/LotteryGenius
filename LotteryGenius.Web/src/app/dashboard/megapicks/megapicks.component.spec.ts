import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegapicksComponent } from './megapicks.component';

describe('MegapicksComponent', () => {
  let component: MegapicksComponent;
  let fixture: ComponentFixture<MegapicksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MegapicksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegapicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
