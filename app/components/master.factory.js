(function () {

  'use strict';

  angular
    .module('wcui')
    .factory('masterFactory', masterFactory);

  function masterFactory($q, bnetFactory) {


    var data = {
      loaded: false,
      pets: [],
      mounts: [],
      realms: [],
      realmsText: [],
      toys: []
    };

    return {
      data: data,
      loadData: loadData
    };


    function loadData() {
      return $q.all([loadRealms(), loadPets(), loadMounts(), loadToys()])
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



    function loadRealms() {
      return bnetFactory
        .getRealms()
        .then(loadRealmsSuccess)
        .catch(loadRealmsFailure);
    }



    function loadRealmsSuccess(response) {
      for (var i = 0, j = response.data.realms.length; i < j; i++) {
        data.realms.push(response.data.realms[i]);
        data.realmsText.push(response.data.realms[i].name);
      }
    }


    function loadRealmsFailure(error) {
      console.log('loadRealms failed:' + error);
    }


    function loadToys() {

    }


  }
})();
