(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .factory('bnetFactory', bnetFactory);

  function bnetFactory($http, constants, httpFactory) {
    return {
      getPets: getPets
    };

    function getPets(server, player) {
      var settings = {
        method: 'GET',
        url: 'https://us.api.battle.net/wow/character/' + server + '/' + player + '?fields=pets&locale=en_US&apikey=' + constants.bnetKey,
      };
      return httpFactory.request(settings);
    }

  }
})();
