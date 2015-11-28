'use strict';
angular
  .module('FileSync')
  .controller('NotifCtrl', ['$scope', 'moment', 'SocketIOService',  function($scope, moment, SocketIOService) {
    this.hours = [];
    this.breaks = [];
    this.message = undefined;
    this.ind = 1;

    function onCalendarNewFile(calendar) {
      this.hours = calendar.heures;
      this.breaks = calendar.pauses;
      $scope.$apply();
    }
SocketIOService.onCalendarNewFile(onCalendarNewFile.bind(this));

    this.calculateTime = function (){
      this.message = undefined;
      var now = moment();
      //var hours = ['09:20', '10:50', '12:20', '14:50', '16:20', '17:50'];
      //var breaks = ['10', '10', '70', '10', '10', '0'];
      var closest = moment(this.hours[0], 'HH:mm');
      for (var i = 0; i < this.hours.length; i++) {
        var current = moment(this.hours[i], 'HH:mm');

        if ( current > now && current > closest && closest < now ){
            closest = moment(this.hours[i], 'HH:mm');
            console.log("asdsd "+closest.format('HH:mm'));
            this.ind = i;
            this.message = undefined;
        } else if ( !(current > now) && current > closest && closest < now) {
          closest = moment(this.hours[i], 'HH:mm');
          console.log("bsdsd " +closest.format('HH:mm'));
          this.ind = i;
          this.message = "Allez, partez chez vous !";
        }
      }


      if (moment(this.hours[this.ind-1], 'HH:mm') < now) {
        var endPause = moment(this.hours[this.ind-1], 'HH:mm').add(this.breaks[this.ind-1], 'minutes');
        var bet = moment(this.hours[this.ind-1], 'HH:mm');

        if ( now.isBetween(bet, endPause) ) {
          if( endPause.diff(now,'minutes') == 0){
            this.message = "C'est la pause ! Vous avez encore " + endPause.diff(now, 'seconds') + " secondes de pause." + " Cours @ " + endPause.format('HH:mm');
          }else{
            this.message = "C'est la pause ! Vous avez encore " + endPause.diff(now, 'minutes') + " minutes de pause." + " Cours @ " + endPause.format('HH:mm');
          }
          console.log("Next @ "+closest.format('HH:mm'));
          console.log("C'est la pause ! " + this.ind);
          if ( this.breaks[this.ind-1] > 10 ) {
            this.message = "Allez manger !" + " Cours @ " + endPause.format('HH:mm');
            console.log("Allez manger !" + " Cours @ " + endPause.format('HH:mm'));
          }
        }
      } else {
        var endPause = moment(closest).add(this.breaks[this.ind], 'minutes');
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
