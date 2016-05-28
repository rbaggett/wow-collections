(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('HeaderController', HeaderController);

  function HeaderController($rootScope, $state, characterFactory, masterFactory, utilityFactory) {

    var vm = this;

    /* scope data */
    vm.character = '';
    vm.data = masterFactory.data;
    vm.realm = '';

    /* scope functions */
    vm.getCharacter = getCharacter;
    vm.startsWith = utilityFactory.startsWith;


    /* initialize */
    (function activate() {
      $rootScope.$on('$stateChangeError', processStateError);
    })();


    /**
     * Get character profile data
     */
    function getCharacter() {
      characterFactory
        .loadData(vm.realm, vm.character)
        .then(navigateToTabs)
        .catch(navigateToError);
    }


    /**
     * Navigate to the error state
     * - there was a problem fetching data
     */
    function navigateToError() {
      $state.go('wcui.error');
    }


    /**
     * Navigate to the tabs state
     */
    function navigateToTabs() {
      utilityFactory.setActiveView();
      $state.go('wcui.tabs.pets', {realm: vm.realm, character: vm.character});
      resetInputs();
    }


    /**
     * Process and drive state based on errors
     * @param event {Object} - state event
     * @param toState {string} - destination state
     * @param toParams {Object} - destination parameters
     * @param fromState {string} - source state
     * @param fromParams {Object} - source parameters
     * @param error {Object} - error
     */
    function processStateError(event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if (error.status === 404) {
        $state.go('wcui.error');
      }
    }


    /**
     * Reset the inputs to default
     */
    function resetInputs() {
      vm.character = vm.realm = '';
    }

  }
})();
