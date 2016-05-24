(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('PetDetailsController', PetDetailsController);

  function PetDetailsController($uibModalInstance, pet, species) {

    /* local data */
    var vm = this;
    // var dummy = {
    //   description: 'No description for this pet',
    //   source: 'No source for this pet'
    // };

    vm.pet = pet;
    vm.species = species;

    vm.close = close;

    (function activate() {


    })();

    function close () {
      $uibModalInstance.dismiss('cancel');
    }

  }
})();



