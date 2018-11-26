import { TestBed } from '@angular/core/testing';
import { SettingsService } from './settings.service';
describe('SettingsService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(SettingsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=settings.service.spec.js.map