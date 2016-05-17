(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('HeaderController', HeaderController);

  function HeaderController($state, $stateParams, characterFactory, masterFactory, utilFactory) {

    var vm = this;

    /* data */
    vm.character = '';
    vm.data = masterFactory.data;
    vm.realm = '';

    /* functions */
    vm.getCharacter = getCharacter;


    (function activate() {
      preLoadCharacter();
    })();


    function getCharacter() {
      $state.go('wcui.empty');
      characterFactory
        .loadData(vm.realm, vm.character)
        .then(navigateToMain)
        .catch(navigateToError);
    }


    function navigateToError() {
      $state.go('wcui.error');
    }


    function navigateToMain() {
      utilFactory.setActiveView();
      $state.go('wcui.tabs.pets', {realm: vm.realm, character: vm.character});
    }


    function preLoadCharacter() {
      if ($stateParams.realm && $stateParams.character) {
        vm.realm = stateParams.realm;
        vm.character = stateParams.character;
        getCharacter();
      }
    }

  }
})();
