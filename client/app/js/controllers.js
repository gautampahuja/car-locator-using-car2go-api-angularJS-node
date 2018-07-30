(function () {
    'use strict';
    angular.module('c2g').controller('BaseController', BaseController);
    function BaseController($scope, $rootScope, C2gApiFactory, C2gVehicleService, $modal, $interval) {
        $scope.initMap = function (mapOptions, loc) {
            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
            if (loc != null)
                $scope.showVehicles(loc);
        };

        //attaching click event to the marker
        $scope.attachDetails = function (vehicle, marker) {
            marker.addListener('click', function () {
                $scope.zoomMap = false;
                $scope.map.setZoom(16);
                $scope.map.setCenter(marker.getPosition());
                C2gVehicleService.setVehicleData(vehicle);
                $scope.openModal(vehicle);
            });
        };

        //modal to show details of the vehicle
        $scope.openModal = function () {
            $rootScope.modalInstance = $modal.open({
                templateUrl: 'partials/vehicleDetail.html',
                controller: 'DetailController',
                size: 'lg',
                resolve: {}
            });
            $rootScope.modalInstance.result.then(function () {
            }, function () {
            })['finally'](function () {
                $rootScope.modalInstance = undefined;
            });
        };

        //show vehicles on the map with the custom marker
        $scope.showVehiclesOnMap = function (vehicles) {
            //Loop through the results array and place a marker for each set of coordinates.
            for (var i = 0; i < vehicles.length; i++) {
                var latLng = new google.maps.LatLng(vehicles[i].latitude, vehicles[i].longitude);
                if($scope.zoomMap)
                    $scope.map.setZoom(12);
                var image = 'img/car-icon.png';
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: $scope.map,
                    icon: image
                });
                $scope.attachDetails(vehicles[i], marker);
            }
        };

        $scope.showVehicles = function (loc) {
            C2gApiFactory
                .getVehicles(loc.locationAliases[0])
                .then(function (data) {
                    if (data.length) {
                        $scope.vehicles = data;
                        $scope.showVehiclesOnMap($scope.vehicles);
                    }
                });
        };

        C2gApiFactory
            .getLocations()
            .then(function (data) {
                if (data.length) {
                    $scope.locations = data;
                }
            });

        // init options
        var options = {
            zoom: 5,
            center: new google.maps.LatLng(40.0000, -98.0000),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        $scope.selectedLocation = null;
        $scope.locations = null;
        $scope.map = null;
        $scope.vehicles = null;
        $scope.vehicleInterval = null;
        $scope.zoomMap = true;
        $scope.initMap(options);

        // Change map if a user choose different locations
        $scope.locationChanged = function () {
            $scope.zoomMap = true;
            var lat = $scope.selectedLocation.mapSection.center.latitude;
            var lang = $scope.selectedLocation.mapSection.center.longitude;
            options.center = new google.maps.LatLng(lat, lang);
            $scope.initMap(options, $scope.selectedLocation);

            // call the function after 10 second to again fetch the data
            if($scope.vehicleInterval == null) {
                $scope.vehicleInterval = $interval(function () {
                    $scope.showVehicles($scope.selectedLocation);
                }, 10000);
            }
        };
    }
})();

(function () {
    'use strict';
    angular.module('c2g').controller('DetailController', DetailController);
    function DetailController($scope, $rootScope, C2gVehicleService) {
        $scope.vehicleData = C2gVehicleService.getVehicleData();
        $scope.closeModal = function () {
            $rootScope.modalInstance.dismiss('cancel');
        }
    }
})();