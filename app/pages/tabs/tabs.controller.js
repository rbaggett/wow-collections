(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('TabsController', TabsController);

  function TabsController($state, characterFactory, utilityFactory) {

    var vm = this;

    vm.name = characterFactory.character.name;
    vm.tab = utilityFactory.viewState.tab;

    (function activate() {
      loadDefaultTab();
    })();


    function loadDefaultTab() {
      if ($state.current.name == 'wcui.tabs') {
        $state.go('wcui.tabs.pets');
      }
    }

  }
})();
