(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('MainController', MainController);

  function MainController(bnetFactory) {
    var vm = this;

    vm.pets = [];

    bnetFactory
      .getPets('Dalaran', 'Thulse')
      .then(function(response) {
        console.log(response);
        vm.pets = response.data.pets.collected;
      });
  }

})();
