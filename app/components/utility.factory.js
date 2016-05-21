(function () {

  'use strict';

  angular
    .module('wcui')
    .factory('utilityFactory', utilityFactory);

  function utilityFactory() {

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
      getPetBreeds: getPetBreeds,
      getPetLevels: getPetLevels,
      setActiveView: setActiveView
    };


    function getPetBreeds() {
      return {
        4: {letters: 'P/P', gender: 'male'},
        14: {letters: 'P/P', gender: 'female'},
        5: {letters: 'S/S', gender: 'male'},
        15: {letters: 'S/S', gender: 'female'},
        6: {letters: 'H/H', gender: 'male'},
        16: {letters: 'H/H', gender: 'female'},
        7: {letters: 'H/P', gender: 'male'},
        17: {letters: 'H/P', gender: 'female'},
        8: {letters: 'P/S', gender: 'male'},
        18: {letters: 'P/S', gender: 'female'},
        9: {letters: 'H/S', gender: 'male'},
        19: {letters: 'H/S', gender: 'female'},
        10: {letters: 'P/B', gender: 'male'},
        20: {letters: 'P/B', gender: 'female'},
        11: {letters: 'S/B', gender: 'male'},
        21: {letters: 'S/B', gender: 'female'},
        12: {letters: 'H/B', gender: 'male'},
        22: {letters: 'H/B', gender: 'female'},
        3: {letters: 'B/B', gender: 'male'},
        13: {letters: 'B/B', gender: 'female'}
      };
    }


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
