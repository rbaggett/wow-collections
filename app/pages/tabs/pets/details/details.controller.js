(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('PetDetailsController', PetDetailsController);

  function PetDetailsController($uibModalInstance, pet, species, constants) {

    /* local data */
    var vm = this;

    /* scope data */
    vm.pet = pet;
    vm.source = [];
    vm.species = species;
    vm.urls = constants.urls;

    vm.close = close;

    (function activate() {
      formatSource();

    })();

    function close () {
      $uibModalInstance.dismiss('cancel');
    }


    /**
     * Source comes in as a single string of information
     * - add some html
     * - break it into iterable pieces
     */
    function formatSource() {
      var source = species.source;

      /* inject the currency icon html */
      source = source.replace(/TINTERFACE\\MONEYFRAME\\UI-GOLDICON.BLP:0/g, '&nbsp;<img src="images/UI-GoldIcon.png">');
      source = source.replace(/TINTERFACE\\MONEYFRAME\\UI-SILVERICON.BLP:0/g, '&nbsp;<img src="images/UI-SilverIcon.png">');
      source = source.replace(/TINTERFACE\\MONEYFRAME\\UI-COPPERICON.BLP:0/g, '&nbsp;<img src="images/UI-CopperIcon.png">');

      /* create 'label' html */
      source = source.replace(/(^|\n)([^\n:]+:)/g, '<strong>$2</strong>');

      /* handle returns, then newlines */
      source = source.replace(/\n\n/g, '<br>');
      source = source.replace(/\n/g, '<br>');

      /* break them into rows */
      vm.source = source.split('<br>');
    }

  }
})();



