var CarrosApp = angular.module("CarrosApp", ["ionic"]);

CarrosApp.service("CarrosService",["$http","$rootScope",CarrosService]);

CarrosApp.controller("CarrosCtrl", ["$scope", "$ionicLoading", "CarrosService", CarrosCtrl]);

function CarrosCtrl($scope, $ionicLoading, CarrosService) {
    
    $ionicLoading.show({
      template: 'Carregando carros...'
    });
    
    $scope.carros = [];
    $scope.$on("CarrosApp.carros", function(_, result){
        result.data.forEach(function(c) {
           $scope.carros.push({
               ide: c.id,
               name: c.name,
               brand: c.brand 
           });
        });
        $ionicLoading.hide();
    });
    CarrosService.loadCarros();
}

function CarrosService($http, $rootScope){
    this.loadCarros = function() {
     $http.get("https://tars.eigmercados.com.br/tamandare-friendly-web/rest/vehicle/get").success(function(result){
        $rootScope.$broadcast("CarrosApp.carros", result);
     
     });
        
    }
}