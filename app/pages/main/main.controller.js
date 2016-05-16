(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('MainController', MainController);

  function MainController($state, characterFactory, utilFactory) {

    var vm = this;

    vm.data = characterFactory.data;
    vm.viewState = utilFactory.viewState;


    //(function activate() {
    //  $state.go('wcui.main.pets');
    //})();

  }
})();
