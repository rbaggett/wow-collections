(function () {

  'use strict';

  angular
    .module('wcui')
    .factory('masterFactory', masterFactory);

  function masterFactory($q, bnetFactory) {

    var breeds =  {
      4: {letters: 'P/P', gender: 'male'},
      14: {letters: 'P/P', gender: 'female'},
      5: {letters: 'S/S', gender: 'male'},
      15: {letters: 'S/S', gender: 'female'},
      6: {letters: 'H/H', gender: 'male'},
      16: {letters: 'H/H', gender: 'female'},
      7: {letters: 'H/P', gender: 'male'},
      17: {letters: 'H/P', gender: 'female'},
      8: {letters: 'P/S', gender: 'male'},
      18: {letters: 'P/S', gender: 'female'},
      9: {letters: 'H/S', gender: 'male'},
      19: {letters: 'H/S', gender: 'female'},
      10: {letters: 'P/B', gender: 'male'},
      20: {letters: 'P/B', gender: 'female'},
      11: {letters: 'S/B', gender: 'male'},
      21: {letters: 'S/B', gender: 'female'},
      12: {letters: 'H/B', gender: 'male'},
      22: {letters: 'H/B', gender: 'female'},
      3: {letters: 'B/B', gender: 'male'},
      13: {letters: 'B/B', gender: 'female'}
    };

    var data = {
      breeds: breeds,
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
      data.realms = response.data.realms;
    }


    function loadRealmsFailure(error) {
      console.log('loadRealms failed:' + error);
    }


    function loadToys() {

    }


  }
})();
