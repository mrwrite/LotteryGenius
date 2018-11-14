import { TestBed } from '@angular/core/testing';
import { PowerballService } from './powerball.service';
describe('PowerballService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(PowerballService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=powerball.service.spec.js.map