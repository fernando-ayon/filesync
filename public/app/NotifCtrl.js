'use strict';
angular
  .module('FileSync')
  .controller('NotifCtrl', ['$scope', 'moment', 'SocketIOService',  function($scope, moment, SocketIOService) {
    this.hours = [];
    this.breaks = [];
    this.message = undefined;

    function onCalendarNewFile(calendar) {
      this.hours = calendar.heures;
      this.breaks = calendar.pauses;
      $scope.$apply();
    }
SocketIOService.onCalendarNewFile(onCalendarNewFile.bind(this));

    this.calculateTime = function (){
      var now = moment(),
          ind = 0;

      //var hours = ['09:20', '10:50', '12:20', '14:50', '16:20', '17:50'];
      //var breaks = ['10', '10', '70', '10', '10', '0'];
      var closest = moment(this.hours[0], 'HH:mm');
      for (var i = 0; i < this.hours.length; i++) {
        var current = moment(this.hours[i], 'HH:mm');

        if ( current > now && current > closest && closest < now ){
            closest = moment(this.hours[i], 'HH:mm');
            ind = i;
        }
      }

      var endPause = moment(closest).add(this.breaks[ind], 'minutes');

      if ( endPause > closest ) {
        this.message = "C'est la pause !";
        console.log("C'est la pause !" + ind);
        if ( this.breaks[ind] == 0 ) {
          this.message = "Allez, partez chez vous !";
          console.log("Allez, partez chez vous !");
        } else if ( this.breaks[ind] > 10 ) {
          this.message = "Allez manger !";
          console.log("Allez manger !");
        }
      }

      if( closest.diff(now,'minutes') == 0){
        this.timeLeft = closest.diff(now,'seconds');
        this.unit = "secondes";
        console.log('Prochaine pause dans ', closest.diff(now,'seconds'),'secondes.');
      } else {
        this.timeLeft = closest.diff(now,'minutes');
        this.unit = "minutes";
        console.log('Prochaine pause dans ', closest.diff(now,'minutes'),'minutes.');
      }
      console.log('La prochaine pause @ : ' + closest.format('HH:mm'));
      this.breakTime = closest.format('HH:mm');
    };


  }]);
