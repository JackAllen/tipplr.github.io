var MainController = function ($scope, $window, $rootScope, $http, AUTH_EVENTS, AuthService) {

    var success = function (results) {
        console.log(results.data);
    }

    $http.get('http://tipplrwebservice.azurewebsites.net/api/photos/get', {
    headers: {'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', 'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Methods':'GET'}
});
}