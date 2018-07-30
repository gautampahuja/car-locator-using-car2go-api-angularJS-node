(function () {
    angular.module('c2g').factory('C2gApiFactory', C2gApiFactory);
    function C2gApiFactory($q, $http) {
        return {
            getLocations: function () {
                var deferred = $q.defer();
                $http({
                    url: '/app/locations',
                    method: 'GET'
                }).success(function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            },

            getVehicles: function (locationAlias) {
                var deferred = $q.defer();
                $http({
                    url: '/app/vehicles?alias=' + locationAlias,
                    method: 'GET'
                }).success(function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            }
        }
    }
})();


(function () {
    angular.module('c2g').factory('C2gVehicleService', C2gVehicleService);
    function C2gVehicleService() {
        var data;
        return {
            setVehicleData: function (obj) {
                data = obj;
            },

            getVehicleData: function () {
                return data
            }

        }

    }

})();