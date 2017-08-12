(function () {
    'use strict';

    angular.module('prosoft.test').factory('holidayFactory', holidayFactory);
    function holidayFactory($http) {
        var service = {
            getHolidaysByYear: getHolidaysByYear
        };

        return service;


        function getHolidaysByYear(countryCode, year){
            return $http({
                url: "https://holidayapi.com/v1/holidays",
                method: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                params: {
                    key:"2c41b5f0-e714-424f-b806-a06d74a44b77",
                    country: countryCode,
                    year: year
                }
            });
        }
    }
})();
