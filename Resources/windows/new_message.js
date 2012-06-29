Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/clubs_data.js');
Ti.include('/messageHandler.js');
(function (window) {
  var view, cancel, send, subjectLabel, subject, clubLabel, club, messageLabel, message;
  
  window.updateLayout({
    title: "New Message",
    backgroundColor: '#fff',
    barColour: Util.theme.mainColor,
    layout:'vertical'
  });
  
  view = Ti.UI.createScrollView();
  window.add(view);
  
  cancel = (window.leftNavButton = Ti.UI.createButton({ title: "Cancel" }));
  cancel.addEventListener('click', function () {
    window.close();
  });
  
  send = (window.rightNavButton = Ti.UI.createButton({ title: "Send" }));
  send.addEventListener('click', function () {
    Messages.create({
    	subject : subject.getValue(),
    	body : message.getValue(),
    	club : club.getValue()
    	
    },function(){
      alert("This will send...");
      window.close();    	
    });

  });
  
  subjectLabel = Ti.UI.createLabel({
  	top:10, left:5, text:'Subject:'
  });
  view.add(subjectLabel);
  
  subject = Ti.UI.createTextField({
  	top:10, left:80, height: 30, width:230,
  	borderWidth: 1, borderColor: '#bbb', borderRadius: 3
  });
  view.add(subject);
  
  clubLabel = Ti.UI.createLabel({
  	top: 45, left:5, text:'Club:'
  });
  view.add(clubLabel);
  
  club = Ti.UI.createTextField({
  	top:45, left:80, height: 30, width:230,
  	borderWidth: 1, borderColor: '#bbb', borderRadius: 3
  });
  view.add(club);
  
  club.addEventListener('focus',function(event){
    var viewEvent = Ti.UI.createWindow({
      url: '/windows/pickerWindow.js',
      opacity: 0
    });
    viewEvent.addEventListener('save', function (result) {
      club.value = result.data;
    });
    viewEvent.addEventListener('close', function () {
      viewEvent.close({ opacity: 0, duration: 500 });
    });
    viewEvent.addEventListener('open', function () {
      
      var add = Util.foreach(Util.keys(Data.getUserClubs()), function (_, title) {
        return Ti.UI.createPickerRow({ title: title });
      });
      viewEvent.fireEvent('data', {
        data: {
          type:'club',
          add: add
        }
      });
      viewEvent.animate({
        opacity: 1,
        duration: 500
      });
    });
    viewEvent.open();
  }); 
  
  messageLabel = Ti.UI.createLabel({
  	top: 85, left:5, text:'Message:'
  });
  view.add(messageLabel);
    
  message = Ti.UI.createTextArea({
    hintText: 'Enter message here.',
    top: 120, height: 240, 
    left: 5, right: 5,
    borderWidth: 1, borderColor: '#bbb', borderRadius: 3
  });
  view.add(message);
  
  /*clubPicker = Ti.UI.createPicker({ bottom: 0 });
  view.add(clubPicker);
  clubPicker.add((function () {
    var userclubs = Data.getUserClubs(), result = [];
    Util.foreach(clubsData, function (_, title) {
      if (title in userclubs) {
        result.push(Ti.UI.createPickerRow({ title: title }));
      }
    });
    return result;
  })());
  clubPicker.selectionIndicator = true;*/
  
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);