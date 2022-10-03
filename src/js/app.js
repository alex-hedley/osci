var myApp = angular.module('myApp',[]);
myApp.controller('myController', function ($scope, $http, $q, $filter) {

    $scope.data = {};

    $scope.init = function () {
        getData();
    }

    getData = () =>  {
        var file = 'data/stats.json';

        $http.get(file)
        .then(function(response) {
            // $scope.data = response.data;
            // console.log(response.data);
            var twentyTwentyTwo = response.data["2022"];
            // console.log(twentyTwentyTwo)
            const keys = Object.keys(twentyTwentyTwo);
            // console.log(keys);
            const months = Object.values(twentyTwentyTwo);
            // console.log(months);
            $scope.data = months;
        });
    };

    $scope.init();
});