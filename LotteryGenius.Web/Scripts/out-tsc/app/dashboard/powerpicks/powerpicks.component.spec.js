import { async, TestBed } from '@angular/core/testing';
import { PowerpicksComponent } from './powerpicks.component';
describe('PowerpicksComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [PowerpicksComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PowerpicksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=powerpicks.component.spec.js.map