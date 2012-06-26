Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/clubs_data.js');
Ti.include('/messageHandler.js');
(function (window) {
  var cancel, create, message, clubPicker;
  
  window.updateLayout({
    title: "New Event",
    backgroundColor: '#fff',
    barColor: '#000'
  });
  
  cancel = (window.leftNavButton = Ti.UI.createButton({ title: "Cancel" }));
  cancel.addEventListener('click', function () {
    window.close();
  });
  
  create = (window.rightNavButton = Ti.UI.createButton({ title: "Create" }));
  create.addEventListener('click', function () {
    Ti.API.log("TODO");
    window.close();
  });
  
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);