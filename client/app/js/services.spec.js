describe('c2g factory', function () {
    var Locations;
    var vehicle;
    var $httpBackend = null, authRequestHandler;
    // Before each test load our module
    beforeEach(angular.mock.module('c2g'));

    // Before each test set our injected factory to our local variable
    beforeEach(inject(function(_C2gApiFactory_) {
        Locations = _C2gApiFactory_;
    }));

    beforeEach(inject(function(_C2gVehicleService_) {
        vehicle = _C2gVehicleService_;
    }));
    // A simple test to verify the factory exists
    it('should exist', function() {
        expect(Locations.getLocations).toBeDefined();
        expect(Locations.getVehicles).toBeDefined();
        expect(vehicle.setVehicleData).toBeDefined();
        expect(vehicle.getVehicleData).toBeDefined();
    });

    beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        authRequestHandler = $httpBackend.whenGET('GET', 'https://www.car2go.com/caba/customer/v2/locations')
            .respond({success:true});
    }));
});