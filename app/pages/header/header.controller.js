(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('HeaderController', HeaderController);

  function HeaderController($rootScope, $state, $stateParams, characterFactory, masterFactory, utilityFactory) {

    var vm = this;

    /* data */
    vm.character = '';
    vm.data = masterFactory.data;
    vm.realm = '';

    /* functions */
    vm.getCharacter = getCharacter;
    vm.startsWith = utilityFactory.startsWith;


    (function activate() {
      $rootScope.$on('$stateChangeError', processStateError);
      preLoadCharacter();
    })();


    function getCharacter() {
      characterFactory
        .loadData(vm.realm, vm.character)
        .then(navigateToMain)
        .catch(navigateToError);
    }


    function navigateToEmpty() {
      $state.go('wcui.empty');
    }


    function navigateToError() {
      $state.go('wcui.error');
    }


    function navigateToMain() {
      utilityFactory.setActiveView();
      $state.go('wcui.tabs.pets', {realm: vm.realm, character: vm.character});
    }


    function preLoadCharacter() {
      if ($stateParams.realm && $stateParams.character) {
        vm.realm = stateParams.realm;
        vm.character = stateParams.character;
        getCharacter();
      }
    }


    function processStateError(event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if (error.status === 404) {
        $state.go('wcui.error');
      }
    }

  }
})();
