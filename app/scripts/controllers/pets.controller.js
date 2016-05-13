(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('PetsController', PetsController);

  function PetsController(characterFactory, masterFactory) {

    var vm = this;

    var characterPets = characterFactory.character.pets.collected;
    var masterPets = masterFactory.data.pets;
    vm.pets = [];
    vm.pageSize = 32;
    vm.breeds = {
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

    (function activate() {
      getPets();
    })();

    function getPets() {
      var uncollected = _.xorBy(characterPets, masterPets, 'creatureId');
      for(var count = 0, length = characterPets.length; count < length; count++) {
        characterPets[count].collected = true;
      }
      vm.pets = vm.pets.concat(characterPets).concat(uncollected);
    }

  }
})();
