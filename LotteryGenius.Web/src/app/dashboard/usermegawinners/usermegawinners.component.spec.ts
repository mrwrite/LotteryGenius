import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermegawinnersComponent } from './usermegawinners.component';

describe('UsermegawinnersComponent', () => {
  let component: UsermegawinnersComponent;
  let fixture: ComponentFixture<UsermegawinnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermegawinnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermegawinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
