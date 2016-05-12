(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('HeaderController', HeaderController);

  function HeaderController(bnetFactory, characterFactory) {

    var vm = this;

    /* data */
    vm.realm = {name: 'Dalaran', slug: 'dalaran'};
    vm.character = 'Thulse';

    /* functions */
    vm.getCharacter = getCharacter;
    vm.getRealms = getRealms;
    

    (function activate() {
      bnetFactory
        .getRealms()
        .then(function (response) {
          vm.realms = response.data.realms;
        });
    })();


    function getCharacter() {
      characterFactory
        .loadData(vm.realm.name, vm.character)
        .then(function () {
          
        });
    }


    function getRealms(query) {
      return _.filter(vm.realms, function (realm) {
        return (realm.slug.indexOf(query) === 0)
      })
    }

  }
})();
