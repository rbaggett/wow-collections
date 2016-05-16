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
      .state('wcui.tabs', {
        url: "/",
        views: {
          'wcui@': {
            templateUrl: 'pages/tabs/tabs.html',
            controller: 'TabsController',
            controllerAs: 'vm'
          }
        }
      })


      .state('wcui.tabs.pets', {
        url: "",
        views: {
          'tab@wcui.tabs': {
            templateUrl: 'pages/tabs/pets/pets.html',
            controller: 'PetsController',
            controllerAs: 'vm'
          }
        }
      })
      .state('wcui.tabs.mounts', {
        url: "",
        views: {
          'tab@wcui.tabs': {
            templateUrl: 'pages/tabs/mounts/mounts.html',
            controller: 'MountsController',
            controllerAs: 'vm'
          }
        }
      })
      .state('wcui.tabs.toys', {
        url: "",
        views: {
          'tab@wcui.tabs': {
            templateUrl: 'pages/tabs/toys/toys.html',
            controller: 'ToysController',
            controllerAs: 'vm'
          }
        }
      });
  }

})();

