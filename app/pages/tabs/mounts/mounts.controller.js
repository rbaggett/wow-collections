(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('MountsController', MountsController);

  function MountsController(utilityFactory) {

    var vm = this;


    (function activate() {
      utilityFactory.setActiveView('mounts');
    })();

  }
})();
