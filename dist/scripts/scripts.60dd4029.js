"use strict";angular.module("wowCollectionsUi",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainController",controllerAs:"vm"}).otherwise({redirectTo:"/"})}]),function(){function a(a){var b=this;b.pets=[],a.getPets("Dalaran","Thulse").then(function(a){console.log(a),b.pets=a.data.pets.collected})}angular.module("wowCollectionsUi").controller("MainController",a),a.$inject=["bnetFactory"]}(),function(){var a={bnetKey:"eedv8cxqvh58re7gmfwhy5bhqbkcgwfh"};angular.module("wowCollectionsUi").constant("constants",a)}(),function(){function a(a,b,c){function d(a,d){var e={method:"GET",url:"https://us.api.battle.net/wow/character/"+a+"/"+d+"?fields=pets&locale=en_US&apikey="+b.bnetKey};return c.request(e)}return{getPets:d}}angular.module("wowCollectionsUi").factory("bnetFactory",a),a.$inject=["$http","constants","httpFactory"]}(),function(){function a(a,b){function c(c){var f=b.defer();return a(c).success(d(f)).error(e),f.promise}function d(a){return function(b,c,d,e){var f={data:b,status:c,headers:d,config:e};a.resolve(f)}}function e(a){return function(b,c,d,e){var f={data:b,status:c,headers:headers,config:e};a.reject(f)}}return{request:c}}angular.module("wowCollectionsUi").factory("httpFactory",a),a.$inject=["$http","$q"]}(),angular.module("wowCollectionsUi").run(["$templateCache",function(a){a.put("views/main.html",'<div data-ng-repeat="pet in vm.pets"> <span data-ng-bind="pet | json"></span> </div>')}]);