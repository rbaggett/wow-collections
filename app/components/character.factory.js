(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .factory('characterFactory', characterFactory);

  function characterFactory($q, bnetFactory) {

    // var data = {
    //   character: {},
    //   loaded: false,
    //   pets: [],
    //   mounts: [],
    //   toys: []
    // };
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
      console.log('loadData failed:' + error);
    }


    function loadDataSuccess(response) {
      angular.copy(response.data, character);
    }

  }
})();
