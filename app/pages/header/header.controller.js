(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('HeaderController', HeaderController);

  function HeaderController($state, characterFactory, masterFactory, utilFactory) {

    var vm = this;

    /* data */
    // vm.realm = 'ghostlands';
    vm.realm = 'dalaran';
    vm.data = masterFactory.data;
    // vm.character = 'Phalys';
    vm.character = 'Thulse';

    /* functions */
    vm.getCharacter = getCharacter;



    (function activate() {
      // something?
    })();


    function getCharacter() {
      $state.go('wcui.main');
      characterFactory
        .loadData(vm.realm, vm.character)
        .then(navigateToMain);
    }


    function navigateToMain() {
      utilFactory.setActiveView();
      $state.go('wcui.main.pets');
    }

  }
})();
