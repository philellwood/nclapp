Ti.include('/util.js');
Ti.include('/data.js');
(function (window) {
  var newMsgButton;

  newMsgButton = (window.rightNavButton = Ti.UI.createButton({
    title: "New Message",
    style: Ti.UI.iPhone.SystemButtonStyle.DONE,
    enabled: false
  }));
  newMsgButton.addEventListener('click', function () {
    Ti.UI.createWindow({ url: 'new_message.js', modal: true }).open();
  });
  window.addEventListener('focus', function () {
    newMsgButton.enabled = !Util.isEmptyObject(Data.getUserClubs());
  });


}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);