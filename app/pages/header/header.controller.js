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
      $state.go('wcui.empty');
      characterFactory
        .loadData(vm.realm, vm.character)
        .then(navigateToMain)
        .catch(navigateToCharacterNotFound);
    }


    function navigateToCharacterNotFound() {
      debugger
      //$state.go('wcui.characterNotFound');
    }



    function navigateToMain() {
      utilFactory.setActiveView();
      $state.go('wcui.tabs.pets');
    }

  }
})();
