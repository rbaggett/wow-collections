(function () {

  'use strict';

  angular
    .module('wcui')
    .factory('utilityFactory', utilityFactory);

  function utilityFactory() {

    var viewState = {
      tab: {
        character: {
          active: false
        },
        pets: {
          active: false
        },
        mounts: {
          active: false
        },
        toys: {
          active: false
        }
      }
    };

    return {
      viewState: viewState,
      setActiveView: setActiveView
      // startsWith: startsWith
    };


    /**
     * Set the active view
     * @param view {string} - view to set
     */
    function setActiveView(view) {
      viewState.tab.character.active = false;
      viewState.tab.pets.active = false;
      viewState.tab.mounts.active = false;
      viewState.tab.toys.active = false;
      if (view) {
        viewState.tab[view].active = true;
      }
    }


    // function startsWith(item, viewValue) {
    //   return item.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
    // }

  }
})();
