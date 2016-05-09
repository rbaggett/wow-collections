(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('MainController', MainController);

  function MainController(bnetFactory) {
    bnetFactory
      .getPets('Dalaran', 'Thulse')
      .then(function(response) {
        console.log(response);
      });
  }

})();
