(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('ToysController', ToysController);

  function ToysController(utilityFactory) {

    var vm = this;


    (function activate() {
      utilityFactory.setActiveView('toys');
    })();

  }
})();
