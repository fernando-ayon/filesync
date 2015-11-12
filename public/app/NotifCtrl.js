'use strict';
angular
  .module('FileSync')
  .controller('NotifCtrl', ['$scope', 'moment', 'SocketIOService',  function($scope, moment, SocketIOService) {
    this.hours = [];

    function onCalendarNewFile(calendar) {
      console.log(calendar);
      this.hours = calendar;
      $scope.$apply();
    }
SocketIOService.onCalendarNewFile(onCalendarNewFile.bind(this));

    this.calculateTime = function (){
      var now = moment();
      //var hours = ['09:20', '10:50', '12:20', '14:50', '16:20', '17:50'];

      var closest = moment(this.hours[0], 'HH:mm');
      for (var i = 0; i < this.hours.length; i++) {
        var current = moment(this.hours[i], 'HH:mm');

        if ( current > now && current > closest && closest < now ){
            closest = moment(this.hours[i], 'HH:mm');
        }
      }

      console.log('Prochaine pause dans ', closest.diff(now,'minutes'),'minutes.');
      console.log('La prochaine pause @ : ' + closest.format('HH:mm'));
      this.timeLeft = closest.diff(now,'minutes');
      this.breakTime = closest.format('HH:mm');
    };

  }]);


/*var moment = require('moment');
//console.log('TODAY IS : ' + moment().format('dddd'));
//var calendar = (process.argv[3] == undefined) ? '/tmp/iut.json' : path.resolve(__dirname, process.argv[3]);
//console.log("Ca marche: " + calendar);
var obj = JSON.parse(fs.readFileSync(calendar, 'utf8'));
for(var i=0; i<obj.heures.length; i++) {
console.log(obj.heures[i]);
}
var mo = moment({ hour:15, minute:10 });
console.log(mo.format());
var mom = moment().format('HH:mm');
console.log(mom);
*/
