angular.
module('Weather').
controller('WeatherController', function ($scope, DataStore) {
	
	DataStore.load();
	
	$scope.$on('DataStore::storeloaded', function(event) {
		$scope.today = DataStore.getWeatherForToday();
		$scope.forecast = DataStore.getWeatherForecast();
	});
});