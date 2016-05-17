(function () {

  'use strict';

  angular
    .module('wcui')
    .factory('utilFactory', utilFactory);

  function utilFactory() {

    var viewState = {
      tab: {
        pets: {
          active: false,
          count: 10
        },
        mounts: {
          active: false,
          count: 0
        },
        toys: {
          active: false,
          count: 0
        }
      }
    };

    return {
      viewState: viewState,
      setActiveView: setActiveView
    };


    function setActiveView(view) {
      viewState.tab.pets.active = false;
      viewState.tab.mounts.active = false;
      viewState.tab.toys.active = false;
      if (view) {
        viewState.tab[view].active = true;
      }
    }

  }
})();
