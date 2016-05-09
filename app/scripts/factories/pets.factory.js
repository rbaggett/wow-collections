(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .factory('petsFactory', petsFactory);

  function petsFactory() {
    var masterPets = {};
    
    return {
      masterPets: masterPets
    };

  }
})();
