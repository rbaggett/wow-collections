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
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(routing);


function routing($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "views/main.html"
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


// .config(function ($routeProvider) {
//   $routeProvider
//     .when('/', {
//       templateUrl: 'views/main.html',
//       controller: 'MainController',
//       controllerAs: 'vm'
//     })
//     .when('/pets', {
//       templateUrl: 'views/pets.html',
//       controller: 'PetsController',
//       controllerAs: 'vm'
//     })
//     .when('/mounts', {
//       templateUrl: 'views/mounts.html',
//       controller: 'MountsController',
//       controllerAs: 'vm'
//     })
//     .when('/toys', {
//       templateUrl: 'views/toys.html',
//       controller: 'ToysController',
//       controllerAs: 'vm'
//     })
//     .otherwise({
//       redirectTo: '/'
//     });
// });
