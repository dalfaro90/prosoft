(function () {
    'use strict';

    angular.module('prosoft.test').controller('testController', function (holidayFactory) {
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var vm = this;
        var holidays;
        var miliseconds =  24 * 60 * 60 * 1000;

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
            generateCalendar();
        }

        function generateCalendar() {
            var model = vm.model;
            vm.calendar = [];

            if(angular.isUndefined(model) ||
            angular.isUndefined(model.numberOfDays) ||
            angular.isUndefined(model.startDate) ||
            angular.isUndefined(model.countryCode)){
                return result;
            }

            if (!model.numberOfDays){
                return;
            }
            var endDay = new Date(model.startDate.getTime() + model.numberOfDays * miliseconds);

            if(model.startDate.getFullYear() <= 2018 && endDay.getFullYear() >= 2018){
                holidayFactory.getHolidaysByYear(vm.model.countryCode, 2018)
                .success(function (response) {
                    holidays = response;
                    createCalendar();
                })
                .error(function(response) {
                    console.error("There was an error getting holidays");
                    holidays = null;
                    createCalendar();
                });
            } else {
                holidays = null;
                createCalendar();
            }

        }

        function createCalendar(){
            var model = vm.model;
            var result = [];
            var month;
            var week;

            for (var dayIndex = 0; dayIndex < model.numberOfDays; dayIndex++) {

                var date = new Date(model.startDate.getTime() + dayIndex * miliseconds);

                if(!month || month.numberOfMonth !== date.getMonth()){
                    month = getMonth(date);
                    result.push(month);
                    week = null;
                }

                //If it is sunday, it will add new week
                if(!week || date.getDay() === 0)
                {
                    week = getWeek(date);
                    month.weeks.push(week);
                }

                week.days[date.getDay()] = getDateInfo(date);
            }
            vm.calendar = result;
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
            return { days: days };
        }

        function getDateInfo(date){
            var day = {
                isWeekend: date.getDay() === 0 || date.getDay() === 6,
                day: date.getDate(),
                isHoliday: isHoliday(date)
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

        function isHoliday(date) {
            if(date.getFullYear() !== 2018 || !holidays || !holidays.holidays) {
                return false;
            }
            var month = "0" + date.getMonth();
            var dayOfMonth = "0" + date.getDate();
            var key = date.getFullYear() + "-" + month.substring(month.length-2, month.length) + "-" + dayOfMonth.substring(dayOfMonth.length-2, dayOfMonth.length);

            return Boolean(holidays.holidays[key]);

        }

        init();

    });

})();
