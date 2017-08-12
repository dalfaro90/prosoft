(function () {
    'use strict';

    angular.module('prosoft.test').controller('testController', function (holidayFactory) {
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var vm = this;

        vm.openCalendar = openCalendar;
        vm.renderCalendars = renderCalendars;

        function init() {
            vm.model = getDefaultValues();
            vm.calendar = [];
        }

        function openCalendar() {
            vm.openedCalendar = true;
        }

        function getDefaultValues(){
            return {
                numberOfDays: 30,
                countryCode: 'US',
                startDate: new Date()
            };
        }

        function renderCalendars(){
            vm.calendar = getCalendar(vm.model);
        }

        function getCalendar(model) {
            var result = [];
            var month;
            var week;
            var weekIndex = 0;

            if(angular.isUndefined(model) ||
            angular.isUndefined(model.numberOfDays) ||
            angular.isUndefined(model.startDate) ||
            angular.isUndefined(model.countryCode)){
                return result;
            }

            if (!model.numberOfDays){
                return result;
            }


            for (var dayIndex = 0; dayIndex < model.numberOfDays; dayIndex++) {
                var date = new Date(model.startDate.getTime() + dayIndex * 24 * 60 * 60 * 1000);
                if(!month || month.numberOfMonth !== date.getMonth()){
                    month = getMonth(date);
                    result.push(month);
                    week = null;
                }
                if(!week || date.getDay() === 0)
                {
                    week = getWeek(date);
                    month.weeks.push(week);
                }
                week.days[date.getDay()] = getDateInfo(date);
            }
            return result;

        }

        function getMonth(date){
            var numberOfMonth = date.getMonth();
            return {
                name: monthNames[numberOfMonth] + ' ' + date.getFullYear(),
                numberOfMonth: numberOfMonth,
                weeks: []
            };
        }

        function getWeek(date){
            var days = [];
            for (var i = 0; i < 7; i++) {
                days[i] = { className : 'empty-day' }
            };

            return {
                days: days
            };
        }

        function getDateInfo(date){
            var day = {
                isWeekend: date.getDay() === 0 || date.getDay() === 6,
                day: date.getDate(),
                isHoliday: false
            }

            if(day.isHoliday) {
                day.className = 'holiday'
            } else if(day.isWeekend) {
                day.className = 'is-weekend'
            } else {
                day.className = 'workday'
            };
            return day;
        }

        init();

    });

})();
