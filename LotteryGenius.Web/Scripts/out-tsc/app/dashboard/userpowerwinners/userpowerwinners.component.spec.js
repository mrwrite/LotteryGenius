import { async, TestBed } from '@angular/core/testing';
import { UserpowerwinnersComponent } from './userpowerwinners.component';
describe('UserpowerwinnersComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [UserpowerwinnersComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(UserpowerwinnersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=userpowerwinners.component.spec.js.map