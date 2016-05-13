(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('PetsController', PetsController);

  function PetsController(characterFactory, masterFactory) {

    /* local data */
    var vm = this;
    var characterPets = characterFactory.character.pets.collected;
    var masterPets = masterFactory.data.pets;

    /* scope data */
    vm.breeds = masterFactory.data.breeds;
    vm.pageSize = 24;
    vm.pets = [];


    (function activate() {
      processPets();
    })();


    function processPets() {
      addPetMetaData();
      aggregatePets();
    }


    function addPetMetaData() {
      for (var count = 0, length = characterPets.length; count < length; count++) {
        characterPets[count].collected = true;
      }
    }


    function aggregatePets() {
      vm.pets = vm.pets
        .concat(characterPets)
        .concat(_.xorBy(characterPets, masterPets, 'creatureId'));
    }

  }
})();
