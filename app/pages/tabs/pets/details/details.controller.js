(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('PetDetailsController', PetDetailsController);

  function PetDetailsController($uibModalInstance, pet, bnetFactory) {

    /* local data */
    var vm = this;
    var dummy = {
      description: 'No description for this pet',
      source: 'No source for this pet'
    };

    vm.pet = pet;
    vm.species = {};

    vm.close = close;


    (function activate() {
      // debugger
      bnetFactory
        .getPetSpecies(pet.stats.speciesId)
        .then(function(response) {
          vm.species = response.data;
        })
        .catch(function(error) {
          vm.species = dummy;
        });
    })();

    function close () {
      $uibModalInstance.dismiss('cancel');
    }

  }
})();



