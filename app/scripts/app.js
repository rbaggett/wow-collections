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
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(routing);

function loadMasterData(masterFactory) {
  return masterFactory.loadData();
}


function routing($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('wcui', {
      abstract: true,
      resolve: {
        loadMasterData: loadMasterData
      }
    })
    .state('wcui.empty', {
      url: "/",
      views: {
        'wcui@': {
          templateUrl: 'views/empty.html'
        }
      }
    })
    .state('wcui.main', {
      url: "/",
      views: {
        'wcui@': {
          templateUrl: 'views/main.html',
          controller: 'MainController',
          controllerAs: 'vm'
        }
      }
    })


    .state('wcui.main.pets', {
      url: "",
      views: {
        'tab@wcui.main': {
          templateUrl: 'views/pets.html',
          controller: 'PetsController',
          controllerAs: 'vm'
        }
      }
    })
    .state('wcui.main.mounts', {
      url: "",
      views: {
        'tab@wcui.main': {
          templateUrl: 'views/mounts.html',
          controller: 'MountsController',
          controllerAs: 'vm'
        }
      }
    })
    .state('wcui.main.toys', {
      url: "",
      views: {
        'tab@wcui.main': {
          templateUrl: 'views/toys.html',
          controller: 'ToysController',
          controllerAs: 'vm'
        }
      }
    });
}


