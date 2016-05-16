(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('ToysController', ToysController);

  function ToysController(utilFactory) {

    var vm = this;


    (function activate() {
      utilFactory.setActiveView('toys');
    })();

  }
})();
