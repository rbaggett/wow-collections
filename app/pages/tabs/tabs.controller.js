(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('TabsController', TabsController);

  function TabsController($state, utilFactory) {

    var vm = this;

    vm.tab = utilFactory.viewState.tab;

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
