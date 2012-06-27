Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/clubs_data.js');
Ti.include('/messageHandler.js');
(function (window) {
  var view, cancel, send, subject, message, clubPicker;
  
  window.updateLayout({
    title: "New Message",
    backgroundColor: '#fff',
    barColour: '#000'
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
    	club : clubPicker.getSelectedRow(0).getTitle()
    	
    },function(){
      alert("This will send...");
      window.close();    	
    });

  });
  
  subject = Ti.UI.createTextField({
  	top:5, height: 30, width:310,
  	borderWidth: 1, borderColor: '#bbb', borderRadius: 3
  });
  view.add(subject);
  
  message = Ti.UI.createTextArea({
    hintText: 'Enter message here.',
    top: 40, bottom: 222,
    left: 5, right: 5,
    borderWidth: 1, borderColor: '#bbb', borderRadius: 3
  });
  view.add(message);
  
  clubPicker = Ti.UI.createPicker({ bottom: 0 });
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
  clubPicker.selectionIndicator = true;
  
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);