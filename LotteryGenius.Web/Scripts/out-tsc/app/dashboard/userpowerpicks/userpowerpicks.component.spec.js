import { async, TestBed } from '@angular/core/testing';
import { UserpowerpicksComponent } from './userpowerpicks.component';
describe('UserpowerpicksComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [UserpowerpicksComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(UserpowerpicksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=userpowerpicks.component.spec.js.map