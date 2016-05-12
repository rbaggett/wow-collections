'use strict';

/**
 * @ngdoc overview
 * @name wowCollectionsUiApp
 * @description
 * # wowCollectionsUiApp
 *
 * Main module of the application.
 */
angular
  .module('wowCollectionsUi', [
    'angularUtils.directives.dirPagination',
    'ngAnimate',
    'ngCookies',
    'ngMaterial',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(routing)
  .config(palette);

function loadMasterData(masterFactory) {
  return masterFactory.loadData();
}


function routing($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider
    .state('home', {
      url: "/home",
      resolve: {
        loadMasterData: loadMasterData
      },
      templateUrl: "views/main.html",
      controller: 'MainController',
      controllerAs: 'vm'
    })
    .state('home.char', {
      url: "",
      templateUrl: "views/character.html",
      controller: 'CharacterController',
      controllerAs: 'vm'
    })
    .state('home.pets', {
      url: "",
      templateUrl: "views/pets.html",
      controller: 'PetsController',
      controllerAs: 'vm'
    })
    .state('home.mounts', {
      url: "",
      templateUrl: "views/mounts.html",
      controller: 'MountsController',
      controllerAs: 'vm'
    })
    .state('home.toys', {
      url: "",
      templateUrl: "views/toys.html",
      controller: 'ToysController',
      controllerAs: 'vm'
    });
}

function palette($mdThemingProvider) {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('blue')
    .accentPalette('red');
}

