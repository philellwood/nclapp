Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/clubs_data.js');
Ti.include('/messageHandler.js');
(function (window) {
  var cancel, send, message, clubPicker;
  
  window.updateLayout({
    title: "New Message",
    backgroundColor: '#fff'
  });
  
  cancel = (window.leftNavButton = Ti.UI.createButton({ title: "Cancel" }));
  cancel.addEventListener('click', function () {
    window.close();
  });
  
  send = (window.rightNavButton = Ti.UI.createButton({ title: "Send" }));
  send.addEventListener('click', function () {
    Messages.create({
    	body : message.getValue(),
    	club : clubPicker.getSelectedRow().getTitle()
    	
    });
    alert("This will send...");
    window.close();
  });
  
  message = Ti.UI.createTextArea({
    top: 5, bottom: 222,
    left: 5, right: 5,
    borderWidth: 1, borderColor: '#bbb', borderRadius: 3
  });
  window.add(message);
  
  clubPicker = Ti.UI.createPicker({ bottom: 0 });
  window.add(clubPicker);
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