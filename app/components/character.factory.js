(function () {

  'use strict';

  angular
    .module('wcui')
    .factory('characterFactory', characterFactory);

  function characterFactory(bnetFactory) {

    var character = {};

    return {
      character: character,
      loadData: loadData
    };


    function loadData(realm, character) {
      return bnetFactory
        .getCharacter(realm, character)
        .then(loadDataSuccess)
        .catch(loadDataFailure);
    }


    function loadDataFailure(error) {
      throw error;
    }


    function loadDataSuccess(response) {
      angular.copy(response.data, character);
    }

  }
})();
