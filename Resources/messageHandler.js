var Messages = {};

var sdk = new Cocoafish('1PlafvOb0KsfJhWw68tWkGiVt3IkhjxR');

Messages.showInbox = function(){
	sdk.sendRequest('messages/show/inbox.json', 'GET', null, callback);
};

function callback(data) {
  if(data) {
    if(data.meta) {
      var meta = data.meta;
      if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'showMessagesInbox') {
        var messages = data.response.messages;
        Ti.API.log(messages);
      }
    }
  }
}