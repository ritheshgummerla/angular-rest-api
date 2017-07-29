var app = angular.module("app", ["ngRoute"]);


//app.directive('message',function(){
//   return{
//     template:"<span>this is custom directive</span>",
//}
//})


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'user'
        })
        .when('/personlist', {
            templateUrl: 'templates/list.html',
            controller: 'person'
        })
        .when('/person', {
            templateUrl: 'templates/person.html',
            controller: 'personId'
        })
        .when('/delete', {
            templateUrl: 'templates/delete.html',
            controller: 'delete'
        })
        .otherwise({
            redirectTo: '/'
        })

}]);


//post person data
app.controller('user', ['$scope', 'calcFactory', function ($scope, calcFactory) {
    $scope.submit = function () {
        calcFactory.getsum($scope.user, function (r) {
            $scope.result = r;
        })
    }
}]);

app.factory('calcFactory', ['$http', '$log', function ($http, $log) {
    $log.log("intantiating calcFactory....");
    var addsrvce = {};
    addsrvce.getsum = function (user, cb) {
        $http.post('http://192.168.1.21:8080', + user).then(function (res) {
            //$scope.result = res.data;
        }).then(function (res) {
            //$log.log('result is' + res.data)
            cb(res.data)
        }, function (res) {
            $log.log('error');
        })
    }
    return addsrvce;
}]);


//get personList
app.controller('person', ['$scope', 'personService', function ($scope, personService) {
    $scope.getList = function () {
        personService.findPerson(function (r) {
          $scope.data = r;
        });
    };
}]);

app.service('personService', ['$http', '$log', function ($http, $log) {
    this.findPerson = function (cb) {
        $http({
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET',
        }).then(function (resp) {
            $log.log('got the data' + JSON.stringify(resp));
            cb(resp.data);
        }, function (resp) {
            $log.error('Error occurred');
        });
    }
}]);



//get person ById
app.controller('personId', ['$scope', '$filter', 'idService', function ($scope, $filter, idService) {
    $scope.doSearch = function () {
        idService.findPersonById($scope.user, function (r) {
             $scope.id = r.id;
            $scope.title = $filter('uppercase')(r.title);
            $scope.body = r.body;
        });
    };
}]);

app.service('idService', ['$http', '$log', function ($http, $log) {
    this.findPersonById = function (no, cb) {
        $http({
            url: 'https://jsonplaceholder.typicode.com/posts/'+no,
            method: 'GET',
        }).then(function (resp) {
            $log.log('got the data' + JSON.stringify(resp));
            cb(resp.data);
        }, function (resp) {
            $log.error('Error occurred');
        });
    }
}]);


app.directive('mine', function () {
    return {
        templateUrl: 'templates/custom.html',
        controller: 'sum'
    }
})



