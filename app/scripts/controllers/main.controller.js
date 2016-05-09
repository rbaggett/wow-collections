(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('MainController', MainController);

  function MainController($q, bnetFactory, dataFactory) {

    var vm = this;

    /* data */
    vm.realm = {};
    vm.character = '';
    
    vm.current = dataFactory.current;

    /* functions */
    vm.getCharacter = getCharacter;


    (function activate() {
      bnetFactory
          .getRealms()
          .then(function (response) {
            vm.realms = response.data.realms;
          });
    })();


    function getCharacter() {
      bnetFactory
        .getCharacter(vm.realm, vm.character)
        .then(function (response) {
          dataFactory.current.character = response.data;
        });
    }

  }
})();
