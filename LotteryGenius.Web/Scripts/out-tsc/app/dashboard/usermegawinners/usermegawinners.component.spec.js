import { async, TestBed } from '@angular/core/testing';
import { UsermegawinnersComponent } from './usermegawinners.component';
describe('UsermegawinnersComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [UsermegawinnersComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(UsermegawinnersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=usermegawinners.component.spec.js.map