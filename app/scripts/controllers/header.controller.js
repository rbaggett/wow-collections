(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('HeaderController', HeaderController);

  function HeaderController($state, characterFactory, masterFactory) {

    var vm = this;

    /* data */
    vm.realm = 'dalaran';
    vm.data = masterFactory.data;
    vm.character = 'Thulse';

    /* functions */
    vm.getCharacter = getCharacter;
    // vm.getRealms = getRealms;


    (function activate() {
      // something?
    })();


    function getCharacter() {
      characterFactory
        .loadData(vm.realm, vm.character)
        .then(navigateToMain);
    }


    // function getRealms(query) {
    //   return _.filter(vm.realms, function (realm) {
    //     return (realm.slug.indexOf(query) === 0)
    //   })
    // }


    function navigateToMain() {
      $state.go('wcui.main');
    }

  }
})();
