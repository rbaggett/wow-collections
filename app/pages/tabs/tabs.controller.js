(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('TabsController', TabsController);

  function TabsController(utilFactory) {

    var vm = this;

    vm.viewState = utilFactory.viewState;

  }
})();
