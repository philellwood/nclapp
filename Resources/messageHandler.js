Ti.include('cocoafish.js');
Ti.include('userHandler.js');
var Cloud = require('ti.cloud');
Cloud.debug = true;
var Messages = {};

var sdk = new Cocoafish('1iHEqePuYFs3SFXcaVwNIB4nAx3G99Ld','GxvXXCNnjESPojJkCXvGBGdjOJD5kc8k');

Messages.showInbox = function(_callback){
	sdk.sendRequest('messages/show/inbox.json', 'GET', null, function(){
	  if(data) {
        if(data.meta) {
          var meta = data.meta;
          if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'showMessagesInbox') {
            var messages = data.response.messages;
            Ti.API.log(messages);
            _callback(messages);
          }
        }
      }
    });  	
		
};




Messages.create = function(_data,_callback){
  Ti.API.log(_data);
  var sdk = new Cocoafish('1iHEqePuYFs3SFXcaVwNIB4nAx3G99Ld','GxvXXCNnjESPojJkCXvGBGdjOJD5kc8k');  // app key
  
  Users.getUsersFromClub(_data.club, function(users){

	var userIds = Util.foreach(users, function (_, user) {
		return user.id;
	}).join(',');


  	Ti.API.log(userIds);
  	if (Cloud.hasStoredSession()){
  		Ti.API.info(Cloud.retrieveStoredSession());
  	}
  	var postData = {
  	  body : _data.body,
  	  to_ids: userIds
  	}; 
  	Users.login({
		login: Data.load("login"),
		password: Data.load("password")
  	}, function(){
  	  sdk.sendRequest('messages/create.json', 'POST', postData, function(data){
  	    if(data) {
  	  	  Ti.API.log(data);
          if(data.meta) {
            var meta = data.meta;
            if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'createMessage') {
              Ti.API.log(data.response.messages);
              _callback && _callback();
        
            }
          }
        }	
  	  }); 		
  	});
  });
  
};
