var app = angular.module('c2g');
app.directive('vehicleTemplate', function () {
    return {
        restrict: 'E',
        templateUrl: 'partials/vehicle-template.html',
        scope: {
            vehicleData:'='
        },
        link: function (scope, elem, attrs) {
            console.log(scope.vehicleData);
        }
    }
});