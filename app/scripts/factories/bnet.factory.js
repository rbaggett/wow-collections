(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .factory('bnetFactory', bnetFactory);

  function bnetFactory(constants, httpFactory) {
    return {
      getCharacter: getCharacter,
      getPets: getPets,
      getPlayerPets: getPlayerPets,
      getRealms: getRealms
    };


    function getCharacter(realm, character) {
      var settings = {
        method: 'GET',
        url: 'https://us.api.battle.net/wow/character/' + realm + '/' + character + '?locale=en_US&apikey=' + constants.bnetKey
      };
      return httpFactory.request(settings);
    }


    function getPets() {
      var settings = {
        method: 'GET',
        url: 'https://us.api.battle.net/wow/pet/?locale=en_US&apikey=' + constants.bnetKey
      };
      return httpFactory.request(settings);
    }


    function getPlayerPets(server, player) {
      var settings = {
        method: 'GET',
        url: 'https://us.api.battle.net/wow/character/' + server + '/' + player + '?fields=pets&locale=en_US&apikey=' + constants.bnetKey
      };
      return httpFactory.request(settings);
    }


    function getRealms() {
      var settings = {
        method: 'GET',
        url: 'https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=' + constants.bnetKey
      };
      return httpFactory.request(settings);
    }

  }
})();
