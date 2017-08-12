(function () {
    'use strict';

    angular.module('prosoft.test').controller('testController', function (holidayFactory) {
        var vm = this;

        vm.openCalendar = openCalendar;

        function init() {
            vm.model = getDefaultValues();
        }

        function openCalendar() {
            vm.openedCalendar = true;
        }

        function getDefaultValues(){
            return {
                numberOfDays: 0,
                countryCode: 'US',
                startDate: new Date()
            };
        }
        
        init();

    });

})();
