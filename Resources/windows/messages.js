Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/messageHandler.js');
(function (window) {
  var newMsgButton, debugButton;

  window.barColor = '#123';

  newMsgButton = Ti.UI.createButton({
    title: "New MSG"
  });
  newMsgButton.addEventListener('click', function () {
    Ti.UI.createWindow({ url: 'new_message.js', modal: true }).open();
  });
  window.addEventListener('focus', function () {
    window.rightNavButton = Util.isEmptyObject(Data.getUserClubs()) ? undefined : newMsgButton;
  });

  //table = Util.createSimpleDataTable()
  debugButton = Ti.UI.createButton({
  	title: 'get inbox',
  	top: 20
  });
  debugButton.addEventListener('click', function(){
  	Messages.showInbox(function(messages){
  		var subjectArray = [];
  		for(var i =0;i<messages.length;i++){
  			subjectArray.push(messages[i].body);
  		}
  		Ti.API.info(messages);
  		table = Util.createSimpleDataTable(subjectArray, {'row':{height:40}});
  		window.add(table);
  	}) 	
  });
  window.add(debugButton);

}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);