Ti.include('cocoafish.js');
Ti.include('userHandler.js');
var Messages = {};

var sdk = new Cocoafish('1PlafvOb0KsfJhWw68tWkGiVt3IkhjxR');

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
  var sdk = new Cocoafish('1PlafvOb0KsfJhWw68tWkGiVt3IkhjxR');  // app key
  Users.getUsersFromClub(_data.club, function(users){
  	Ti.API.debug(_data);
  	var userIds = function(users){
  		var returnString= '';
  		for(var i=0, iMax=users.length;i<iMax;i++){
  			returnString+=users[i].id;
  		}
  		return returnString;
  	};
  	var postData = {
  	  body : _data.body,
  	  to_ids: userIds
  	}; 
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
  
};
