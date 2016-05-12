(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .factory('masterFactory', masterFactory);

  function masterFactory($q, bnetFactory) {

    var data = {
      loaded: false,
      pets: [],
      mounts: [],
      realms: [],
      toys: []
    };

    return {
      data: data,
      loadData: loadData
    };


    function loadData() {
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
        .getPets()
        .then(function (response) {
          data.pets = response.data.pets;
        })
    }


    function loadToys() {

    }


  }
})();
