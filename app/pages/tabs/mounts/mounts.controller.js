(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('MountsController', MountsController);

  function MountsController(utilFactory) {

    var vm = this;


    (function activate() {
      utilFactory.setActiveView('mounts');
    })();

  }
})();
