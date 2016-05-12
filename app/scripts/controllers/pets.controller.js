(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('PetsController', PetsController);

  function PetsController(characterFactory, masterFactory) {

    var vm = this;

    vm.characterData = characterFactory.data;
    vm.masterData = masterFactory.data;
    vm.pets = [];
    vm.pageSize = 64;

    (function activate() {
      // vm.pets = vm.masterData.pets;
      // _.foreach(vm.pets, )
    })();

  }
})();
