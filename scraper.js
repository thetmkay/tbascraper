var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs'),
	__ = require('underscore');


var getTeamsAtEvent = function getTeamsAtEvent(eventID, callback) {
	var teamsList = [];

	request('http://www.thebluealliance.com/event/' + eventID, function(err, response, body) {
		if(err)
			throw err;

		$ = cheerio.load(body);
		$('#teams table > tbody > tr').each(function(index,element) {
			var team = {};
			$(element).find('td').each(function(i,e) {
				switch(i) {
					case 0: team.number = $(e).find('a').text();
							break;
					case 1: team.name = $(e).find('a').text();
							break;
					case 2: team.city = $(e).text();
				}
			});
			teamsList.push(team);
		});
		callback(teamsList);
	});
};

