var Data = {};

Data.CLUBS = 'clubs';

Data.getUserClubs = function () {
	if (Ti.App.Properties.hasProperty(Data.CLUBS)){
		return Ti.App.Properties.getList(Data.CLUBS);
	}
	
};

Data.subscribeToClub = function(clubName){
	var currentClubs;
	
	if (Ti.App.Properties.hasProperty(Data.CLUBS)){
		currentClubs = Ti.App.Properties.getList(Data.CLUBS);
	}
	
	currentClubs.push(clubName);
	
	Ti.App.Properties.setList(Data.CLUBS, currentClubs);
};