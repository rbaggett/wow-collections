(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('PetDetailsController', PetDetailsController);

  function PetDetailsController($uibModalInstance, pet, species, constants) {

    /* local data */
    var vm = this;
    // var dummy = {
    //   description: 'No description for this pet',
    //   source: 'No source for this pet'
    // };

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



    function formatSource() {
      var source = species.source;
      source = source.replace(/TINTERFACE\\MONEYFRAME\\UI-GOLDICON.BLP:0/g, '&nbsp;<img src="images/UI-GoldIcon.png">');
      source = source.replace(/TINTERFACE\\MONEYFRAME\\UI-SILVERICON.BLP:0/g, '&nbsp;<img src="images/UI-SilverIcon.png">');
      source = source.replace(/TINTERFACE\\MONEYFRAME\\UI-COPPERICON.BLP:0/g, '&nbsp;<img src="images/UI-CopperIcon.png">');

      source = source.replace(/Achievement:/g, '<strong>Achievement: </strong>');
      source = source.replace(/Category:/g, '<strong>Category: </strong>');
      source = source.replace(/Cost:/g, '<strong>Cost: </strong>');
      source = source.replace(/Drop:/g, '<strong>Drop: </strong>');
      source = source.replace(/Fishing:/g, '<strong>Fishing: </strong>');
      source = source.replace(/Garrison Mission:/g, '<strong>Garrison Mission: </strong>');
      source = source.replace(/In-Game Shop/g, '<strong>In-Game Shop</strong>');
      source = source.replace(/In-Game Shop:/g, '<strong>In-Game Shop: </strong>');
      source = source.replace(/Pet Battle:/g, '<strong>Pet Battle: </strong>');
      source = source.replace(/Profession:/g, '<strong>Profession: </strong>');
      source = source.replace(/Promotion:/g, '<strong>Promotion: </strong>');
      source = source.replace(/Quest:/g, '<strong>Quest: </strong>');
      source = source.replace(/Trading Card Game:/g, '<strong>Trading Card Game: </strong>');
      source = source.replace(/Vendor:/g, '<strong>Vendor: </strong>');
      source = source.replace(/World Event:/g, '<strong>World Event: </strong>');
      source = source.replace(/Zone:/g, '<strong>Zone: </strong>');




      source = source.replace(/\n\n/g, '<br>');
      vm.source = source.split('<br>');
      // vm.source = source.split('\n');
      console.log(vm.source);
    }

  }
})();



