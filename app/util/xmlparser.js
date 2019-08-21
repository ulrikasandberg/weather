angular.
module('Weather').
service('XMLParser', function() {

	this.parseXML = function(xmlData) {
		var parser = new DOMParser(),
			xml = parser.parseFromString(xmlData, 'text/xml'),
			items = xml.getElementsByTagName('tabular')[0].children,
			data = [],
			symbol,
			temperature,
			item,
			i;			
		
		if(items) {
			for(i = 0; i < items.length; i++) {
				item = items[i];
			
				symbol = item.getElementsByTagName('symbol');
				temperature = item.getElementsByTagName('temperature'),

				data.push({
					date: new Date(item.attributes.getNamedItem('from').value),
					period: item.attributes.getNamedItem('period').value,
					symbolId: symbol[0].attributes.getNamedItem('var').value,
					description: symbol[0].attributes.getNamedItem('name').value,
					temperature: temperature[0].attributes.getNamedItem('value').value
				});
			}
		}
		
		return data;
	}

});