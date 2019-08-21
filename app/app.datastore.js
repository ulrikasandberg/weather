angular.
module('Weather').
factory('DataStore', function($http, $rootScope, XMLParser, UrlManager) {
	return {
		todayData: {},
		forecastData: [],
		
		load: function() {
			var me = this, 
				url = UrlManager.getUrlForWeatherResource();
		
			$http.get(url).then(function(response) {
				var data = XMLParser.parseXML(response.data),
				item,
				i;
		
				if(data.length === 0) {
					return;
				}
		
				me.todayData = data[0];
				me.todayData.symbol = UrlManager.getUrlForSymbol(me.todayData.symbolId, 100);

				data.shift();
				
				for(i = 0; i < data.length; i++) {
					item = data[i];

					// Prognosen visar bara data från period 2 som är mellan kl 12 och 18 den aktuella dagen.
					if(item.period === '2') {
						item.symbol = UrlManager.getUrlForSymbol(item.symbolId, 38);
						me.forecastData.push(item);
					}
				}
				
				$rootScope.$broadcast('DataStore::storeloaded');
			});

		},
		
		getWeatherForToday: function() {
			return this.todayData;
		},
		
		getWeatherForecast: function() {
			return this.forecastData;
		}
	};
});