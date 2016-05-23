(function () {

  'use strict';

  angular
    .module('wcui')
    .factory('bnetFactory', bnetFactory);

  function bnetFactory(constants, httpFactory) {
    return {
      getCharacter: getCharacter,
      getPets: getPets,
      getPetSpecies: getPetSpecies,
      getRealms: getRealms
    };


    function getCharacter(realm, character) {
      var settings = {
        method: 'GET',
        url: 'https://us.api.battle.net/wow/character/' + realm + '/' + character + '?fields=pets,mounts&apikey=' + constants.bnetKey
      };
      return httpFactory.request(settings);
    }


    function getPets() {
      var settings = {
        method: 'GET',
        url: 'https://us.api.battle.net/wow/pet/?fields=species&apikey=' + constants.bnetKey
      };
      return httpFactory.request(settings);
    }


    function getPetSpecies(speciesId) {
      var settings = {
        method: 'GET',
        url: 'https://us.api.battle.net/wow/pet/species/' + speciesId + '?locale=en_US&apikey=' + constants.bnetKey
      };
      return httpFactory.request(settings);

    }

    // function getCharacterPets(server, player) {
    //   var settings = {
    //     method: 'GET',
    //     url: 'https://us.api.battle.net/wow/character/' + server + '/' + player + '?fields=pets&locale=en_US&apikey=' + constants.bnetKey
    //   };
    //   return httpFactory.request(settings);
    // }


    function getRealms() {
      var settings = {
        method: 'GET',
        url: 'https://us.api.battle.net/wow/realm/status?&apikey=' + constants.bnetKey
      };
      return httpFactory.request(settings);
    }

  }
})();
