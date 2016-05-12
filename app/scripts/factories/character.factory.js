(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .factory('characterFactory', characterFactory);

  function characterFactory($q, bnetFactory) {

    var data = {
      character: {},
      loaded: false,
      pets: [],
      mounts: [],
      toys: []
    };

    return {
      data:data,
      loadData: loadData
    };


    function loadData(realm, character) {
      return bnetFactory
        .getCharacter(realm, character)
        .then(function (response) {
          data.character = response.data;
        })
        .then(loadDataCollections);
    }


    function loadDataCollections() {
      return $q.all([loadPets(), loadMounts(), loadToys()])
        .then(function() {
          data.loaded = true;
        })
        .catch(function() {
          data.loaded = false;
        })
    }


    function loadMounts() {

    }



    function loadPets() {
      return bnetFactory
        .getCharacterPets(data.character.realm, data.character.name)
        .then(function (response) {
          data.pets = response.data.pets.collected;
        })
    }


    function loadToys() {

    }


  }
})();
