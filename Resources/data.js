var Data = {};

Data.CLUBS = 'clubs';

Data.getUserClubs = function () {
	if (!Ti.App.Properties.hasProperty(Data.CLUBS)){
  	  Data.setUserClubs({});
	}
	return JSON.parse(Ti.App.Properties.getString(Data.CLUBS));
};

Data.downloadClubs = function(){
  var custom_fields = JSON.parse(Users.showCurrent.custom_fields);
  Ti.API.debug(custom_fields);
  return custom_fields.clubs;
  
};

Data.updateCloudClubs = function(){
	
	Users.update({
		custom_fields: '{"clubs":'+JSON.stringify(Data.getUserClubs())+'}'
	});
};


Data.setUserClubs = function (clubs) {
  Ti.App.Properties.setString(Data.CLUBS, JSON.stringify(clubs));
  Data.updateCloudClubs();
};

Data.subscribeToClub = function(clubName) {
  var clubs = Data.getUserClubs();
  clubs[clubName] = clubName;
  Data.setUserClubs(clubs);
};

Data.unsubscribeToClub = function(clubName){
  var clubs = Data.getUserClubs();
  delete clubs[clubName];
  Data.setUserClubs(clubs);
};

Data.removeAllClubs = function(){
	Ti.App.Properties.removeProperty(Data.CLUBS);
};
