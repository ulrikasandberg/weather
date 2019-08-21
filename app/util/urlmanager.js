angular.
module('Weather').
service('UrlManager', function() {
	this.getUrlForWeatherResource = function() {
		return 'https://www.yr.no/place/Sweden/Norrbotten/Lule%C3%A5/forecast.xml';
	},
	this.getUrlForSymbol = function(id, size) {
		return 'http://symbol.yr.no/grafikk/sym/b' + size + '/' + id + '.png';
	}
});