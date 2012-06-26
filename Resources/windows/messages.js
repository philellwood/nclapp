Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/messageHandler.js');
(function (window) {
  var newMsgButton, refreshBtn, table, refresh, allMessages;

  window.barColor = '#123';

  newMsgButton = Ti.UI.createButton({
    title: "New MSG"
  });
  newMsgButton.addEventListener('click', function () {
    Ti.UI.createWindow({ url: 'new_message.js', modal: true }).open();
  });
  window.addEventListener('focus', function () {
    window.rightNavButton = Util.isEmptyObject(Data.getUserClubs()) ? undefined : newMsgButton;
    refresh();
  });
  
  table = Ti.UI.createTableView();
  window.add(table);
  table.addEventListener('click', function (event) {
    if (!(allMessages[event.index])) return;
    var msgData = allMessages[event.index];
    var viewMsg = Ti.UI.createWindow({
      url: '/windows/view_message.js',
      opacity: 0
    });
    viewMsg.addEventListener('open', function () {
      viewMsg.fireEvent('data', {
        data: msgData
      });
    });
    viewMsg.open();
  });
  
  refresh = function () {
    Messages.showInbox(function (messages) {
      allMessages = messages;
      table.data = Util.foreach(messages, function (_, item) {
        return Ti.UI.createTableViewRow({
          title: item.subject,
          height: 40
        });
      });
    });
  };
  
  refreshBtn = (window.leftNavButton = Ti.UI.createButton({
    title: 'Refresh'
  }));
  refreshBtn.addEventListener('click', function () {
    refresh(); 	
  });

}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);