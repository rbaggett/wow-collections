(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('CharacterController', CharacterController);

  function CharacterController(characterFactory, masterFactory, utilityFactory) {

    var vm = this;

    vm.character = characterFactory.character;
    vm.data = masterFactory.data;

    (function activate() {
      utilityFactory.setActiveView('character');
    })();

  }
})();
