(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .factory('httpFactory', httpFactory);

  function httpFactory($http, $q) {
    return {
      request: request
    };


    function request(settings) {
      var deferred = $q.defer();
      $http(settings)
        .success(requestSuccess(deferred))
        .error(requestError);
      return deferred.promise;
    }


    function requestSuccess(deferred) {
      return function(data, status, headers, config) {
        var response = {
          data: data,
          status: status,
          headers: headers,
          config: config
        };
        deferred.resolve(response);
      }
    }


    function requestError(deferred) {
    return function(data, status, headerse, config) {
        var response = {
          data: data,
          status: status,
          headers: headers,
          config: config
        };
        deferred.reject(response);
      }
    }

  }
})();
