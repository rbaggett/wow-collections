(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('MainController', MainController);

  function MainController(characterFactory, utilFactory) {

    var vm = this;

    vm.data = characterFactory.data;
    vm.viewState = utilFactory.viewState;

  }
})();
