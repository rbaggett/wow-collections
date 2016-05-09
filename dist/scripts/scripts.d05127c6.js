"use strict";angular.module("wowCollectionsUi",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainController",controllerAs:"main"}).otherwise({redirectTo:"/"})}]),function(){function a(a){a.getPets("Dalaran","Thulse").then(function(a){console.log(a)})}angular.module("wowCollectionsUi").controller("MainController",a),a.$inject=["bnetFactory"]}(),function(){var a={bnetKey:"eedv8cxqvh58re7gmfwhy5bhqbkcgwfh"};angular.module("wowCollectionsUi").constant("constants",a)}(),function(){function a(a,b,c){function d(a,d){var e={method:"GET",url:"https://us.api.battle.net/wow/character/"+a+"/"+d+"?fields=pets&locale=en_US&apikey="+b.bnetKey};return c.request(e)}return{getPets:d}}angular.module("wowCollectionsUi").factory("bnetFactory",a),a.$inject=["$http","constants","httpFactory"]}(),function(){function a(a,b){function c(c){var f=b.defer();return a(c).success(d(f)).error(e),f.promise}function d(a){return function(b,c,d,e){var f={data:b,status:c,headers:d,config:e};a.resolve(f)}}function e(a){return function(b,c,d,e){var f={data:b,status:c,headers:headers,config:e};a.reject(f)}}return{request:c}}angular.module("wowCollectionsUi").factory("httpFactory",a),a.$inject=["$http","$q"]}(),angular.module("wowCollectionsUi").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.c582c4d1.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>')}]);