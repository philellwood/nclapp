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


// Data Utility Functions

//  Save property
Data.save = function (id, data) {
  Ti.App.Properties.setString(id, JSON.stringify(data));
};
//  Property exists?
Data.exists = function (id) {
  return Ti.App.Properties.hasProperty(id);
};
//  Load property
Data.load = function (id) {
  if (Data.exists(id)) {
    return JSON.parse(Ti.App.Properties.getString(id));
  }
  throw new Error("No data under id: " + id);
};

//  Get a file
Data.getFile = function (filename) {
  return Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, filename);
};
//  Load a json file
Data.loadJSON = function (filename) {
  return JSON.parse(Data.loadRaw(filename));
};
//  Save a json file
Data.saveJSON = function (filename, data) {
  Data.saveRaw(filename, JSON.stringify(data));
};
//  Load a raw file
Data.loadRaw = function (filename) {
  var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, filename);
  return file.read().text;
};
//  Save a raw file
Data.saveRaw = function (filename, data) {
  var file = Data.getFile(filename);
  file.write(data);
};