(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('PetsController', PetsController);

  function PetsController() {
    
    var vm = this;

    
    (function activate() {
      $q
        .all([getPets(), getPlayerPets()])
        .then(getMissingPets);
    })();


    function getPets() {
      return bnetFactory
        .getPets()
        .then(function (response) {
          vm.pets = response.data.pets;
        });

    }


    function getPlayerPets() {
      return bnetFactory
        .getPlayerPets('Dalaran', 'Thulse')
        .then(function (response) {
          vm.playerPets = response.data.pets.collected;
        });

    }


    function getMissingPets() {
      vm.missingPets = _.differenceBy(vm.pets, vm.playerPets, 'creatureId');
    }


  }

})();
