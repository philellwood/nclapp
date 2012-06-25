Ti.include('/data.js');
(function (window) {
  var newMsgButton, deleteButton;

  Ti.UI.currentWindow.add(Ti.UI.createLabel({
    text: 'Hello, world.',
    top: 30,
    height: 'auto',
    width: 'auto'
  }));

  newMsgButton = Ti.UI.createButton({
     title: 'New Message',
     top: 10,
     width: 300,
     height: 50
  });
  newMsgButton.addEventListener('click', function (e) {
    if (Data.getUserClubs() !== {}) {
      Ti.UI.createWindow({ url: 'new_message.js', modal: true }).open();
    } else {
      alert("You do not belong to any groups.");
    }
  });

  deleteButton = Ti.UI.createButton({
     title: 'Unsubscribe from all Clubs',
     top: 70,
     width: 300,
     height: 50
  });
  deleteButton.addEventListener('click', function (e) {
    Data.removeAllClubs();
    Titanium.API.info("Deleted clubs");
  });

  window.add(newMsgButton, deleteButton);

}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);