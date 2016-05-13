(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('MainController', MainController);

  function MainController(characterFactory) {

    var vm = this;

    vm.data = characterFactory.data;

  }
})();
