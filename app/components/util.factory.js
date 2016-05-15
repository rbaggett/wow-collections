(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .factory('utilFactory', utilFactory);

  function utilFactory() {

    var viewState = {
      tab: {
        pets: false,
        mounts: false,
        toys: false
      }
    };

    return {
      viewState: viewState,
      setActiveView: setActiveView
    };


    function setActiveView(view) {
      viewState.tab.pets = false;
      viewState.tab.mounts = false;
      viewState.tab.toys = false;
      if (view) {
        viewState.tab[view] = true;
      }
    }

  }
})();
