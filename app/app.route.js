(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .config(routing);


  function resolveMasterData(masterFactory) {
    return masterFactory.loadData();
  }


  function routing($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('wcui', {
        abstract: true,
        resolve: {
          resolveMasterData: resolveMasterData
        }
      })
      .state('wcui.empty', {
        url: "/",
        views: {
          'wcui@': {
            templateUrl: 'pages/empty/empty.html'
          }
        }
      })
      .state('wcui.main', {
        url: "/",
        views: {
          'wcui@': {
            templateUrl: 'pages/main/main.html',
            controller: 'MainController',
            controllerAs: 'vm'
          }
        }
      })


      .state('wcui.main.pets', {
        url: "",
        views: {
          'tab@wcui.main': {
            templateUrl: 'pages/pets/pets.html',
            controller: 'PetsController',
            controllerAs: 'vm'
          }
        }
      })
      .state('wcui.main.mounts', {
        url: "",
        views: {
          'tab@wcui.main': {
            templateUrl: 'pages/mounts/mounts.html',
            controller: 'MountsController',
            controllerAs: 'vm'
          }
        }
      })
      .state('wcui.main.toys', {
        url: "",
        views: {
          'tab@wcui.main': {
            templateUrl: 'pages/toys/toys.html',
            controller: 'ToysController',
            controllerAs: 'vm'
          }
        }
      });
  }

})();

