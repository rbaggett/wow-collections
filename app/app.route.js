(function () {

  'use strict';

  angular
    .module('wcui')
    .config(routing);


  /**
   * State routing character data resolve
   * @param $stateParams {Object} - state parameters
   * @param characterFactory {function} - character factory
   * @param petsFactory {function} - pets factory
   * @returns {promise} - character data load promise
   */
  function resolveCharacter($stateParams, resolveMasterData, characterFactory, petsFactory) {
    return characterFactory
      .loadData($stateParams.realm, $stateParams.character)
      .then(petsFactory.loadData);
  }


  /**
   * State routing master data resolve
   * @param masterFactory {function} - master data factory
   * @returns {promise} - master data load promise
   */
  function resolveMasterData(masterFactory) {
    return masterFactory
      .loadData();
  }


  /**
   * State routing for the application
   * @param $stateProvider
   * @param $urlRouterProvider
   */
  function routing($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
      .otherwise("/");

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
      .state('wcui.error', {
        url: "/error",
        views: {
          'wcui@': {
            templateUrl: 'pages/error/error.html'
          }
        }
      })

      .state('wcui.tabs', {
        resolve: {
          resolveCharacter: resolveCharacter
        },
        url: "/:realm/:character",
        views: {
          'wcui@': {
            templateUrl: 'pages/tabs/tabs.html',
            controller: 'TabsController',
            controllerAs: 'vm'
          }
        }
      })
      .state('wcui.tabs.pets', {
        url: "/pets",
        views: {
          'tab@wcui.tabs': {
            templateUrl: 'pages/tabs/pets/pets.html',
            controller: 'PetsController',
            controllerAs: 'vm'
          }
        }
      })
      .state('wcui.tabs.mounts', {
        url: "/mounts",
        views: {
          'tab@wcui.tabs': {
            templateUrl: 'pages/tabs/mounts/mounts.html',
            controller: 'MountsController',
            controllerAs: 'vm'
          }
        }
      })
      .state('wcui.tabs.toys', {
        url: "/toys",
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

