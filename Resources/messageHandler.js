Ti.include('cocoafish.js');
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




Messages.create = function(_data){
  var sdk = new Cocoafish('1PlafvOb0KsfJhWw68tWkGiVt3IkhjxR');  // app key
  Users.getUsersFromClub(_data.club, function(users){
  	var userIds = function(users){
  		var returnString= '';
  		for(var i=0, iMax=users.length;i<iMax;i++){
  			returnString+=users[i].id;
  		}
  		return returnString;
  	}
  	var data = {
  	  body : _data.body,
  	  to_ids: userIds
  	} 
  	sdk.sendRequest('messages/create.json', 'POST', data, function(){
  	  if(data) {
        if(data.meta) {
          var meta = data.meta;
          if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'createMessage') {
            Ti.API.log(data.response.messages);
        
          }
        }
      }	
  	});
  });
  
};
