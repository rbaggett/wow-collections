(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('CharacterController', CharacterController);

  function CharacterController(dataFactory) {

    var vm = this;

    vm.current = dataFactory.current;


  }
})();
