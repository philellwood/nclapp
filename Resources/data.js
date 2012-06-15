var Data = {};

Data.CLUBS = 'clubs';

Data.getUserClubs = function () {
	if (!Ti.App.Properties.hasProperty(Data.CLUBS)){
  	Data.setUserClubs({});
	}
	return JSON.parse(Ti.App.Properties.getString(Data.CLUBS));
};

Data.setUserClubs = function (clubs) {
  Ti.App.Properties.setString(Data.CLUBS, JSON.stringify(clubs));
};

Data.subscribeToClub = function(clubName) {
  var clubs = Data.getUserClubs();
  clubs[clubName] = clubName;
  Data.setUserClubs(clubs);
};
