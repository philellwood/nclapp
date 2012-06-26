Ti.include('/util.js');
Ti.include('/data.js');
(function (window) {
  var newMsgButton;

  window.barColor = '#123';

  newMsgButton = Ti.UI.createButton({
    title: "New MSG",
    style: Ti.UI.iPhone.SystemButtonStyle.DONE
  });
  newMsgButton.addEventListener('click', function () {
    Ti.UI.createWindow({ url: 'new_message.js', modal: true }).open();
  });
  window.addEventListener('focus', function () {
    window.rightNavButton = Util.isEmptyObject(Data.getUserClubs()) ? undefined : newMsgButton;
  });


}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);