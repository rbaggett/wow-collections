(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .factory('dataFactory', dataFactory);

  function dataFactory() {

    var current = {
      character: {},
      pets: [],
      mounts: []
    };

    return {
      current: current
    };

  }
})();
