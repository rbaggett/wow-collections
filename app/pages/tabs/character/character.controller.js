(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('CharacterController', CharacterController);

  function CharacterController(characterFactory, masterFactory, utilFactory) {

    var vm = this;

    vm.character = characterFactory.character;
    vm.data = masterFactory.data;

    (function activate() {
      utilFactory.setActiveView('character');
    })();

  }
})();
