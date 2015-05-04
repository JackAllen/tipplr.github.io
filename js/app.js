var app = angular.module("RefundApp", []);

app
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.controller("MainController", ["$scope", "$window", "$rootScope", "$http", "AUTH_EVENTS", "AuthService", MainController]);

app.service('Session', function () {
    this.create = function (token, userRole) {
        this.token = token;
        this.userRole = userRole;
    };
    this.destroy = function () {
        this.token = null;
        this.userRole = null;
    };
})

app.factory('AuthService', function ($http, Session) {
    var authService = {};

    var error = function (data) {
        console.log(data);
    }

    authService.login = function (credentials) {
        return $http
            .post('/refundservice/api/refunds/get', credentials)
            .then(function (res) {
                Session.create(res.data.token, 'admin');
                return res.data.token;
            }, error);
    };


    authService.isAuthenticated = function () {
        return !!Session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
            authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;
})

app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})

app.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
})