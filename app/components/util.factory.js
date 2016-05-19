(function () {

  'use strict';

  angular
    .module('wcui')
    .factory('utilFactory', utilFactory);

  function utilFactory() {

    var viewState = {
      tab: {
        character: {
          active: false
        },
        pets: {
          active: false
        },
        mounts: {
          active: false
        },
        toys: {
          active: false
        }
      }
    };

    return {
      viewState: viewState,
      getPetLevels: getPetLevels,
      setActiveView: setActiveView
    };


    function getPetLevels() {
      return [
        {value: 0, text: '0'},
        {value: 1, text: '1'},
        {value: 2, text: '2'},
        {value: 3, text: '3'},
        {value: 4, text: '4'},
        {value: 5, text: '5'},
        {value: 6, text: '6'},
        {value: 7, text: '7'},
        {value: 8, text: '8'},
        {value: 9, text: '9'},
        {value: 10, text: '10'},
        {value: 11, text: '11'},
        {value: 12, text: '12'},
        {value: 13, text: '13'},
        {value: 14, text: '14'},
        {value: 15, text: '15'},
        {value: 16, text: '16'},
        {value: 17, text: '17'},
        {value: 18, text: '18'},
        {value: 19, text: '19'},
        {value: 20, text: '20'},
        {value: 21, text: '21'},
        {value: 22, text: '22'},
        {value: 23, text: '23'},
        {value: 24, text: '24'},
        {value: 25, text: '25'}
      ]
    }


    function setActiveView(view) {
      viewState.tab.character.active = false;
      viewState.tab.pets.active = false;
      viewState.tab.mounts.active = false;
      viewState.tab.toys.active = false;
      if (view) {
        viewState.tab[view].active = true;
      }
    }

  }
})();
