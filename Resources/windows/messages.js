Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/messageHandler.js');
(function (window, tab) {
  var newMsgButton, refreshBtn, table, refresh, allMessages;

  newMsgButton = Ti.UI.createButton({
    title: "New MSG"
  });
  newMsgButton.addEventListener('click', function () {
    // Ti.UI.createWindow({ url: 'new_message.js', modal: true }).open();
    var newMSG;
    newMSG = Ti.UI.createWindow({ url: '/windows/new_message.js' });
    newMSG.open({ transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT });
    newMSG.addEventListener('close', function () {
      refresh();
    });
  });
  window.addEventListener('focus', function () {
    window.rightNavButton = Util.isEmptyObject(Data.getUserClubs()) ? undefined : newMsgButton;
    // refresh();
  });
  
  table = Ti.UI.createTableView();
  window.add(table);
  table.addEventListener('click', function (event) {
    if (!(allMessages[event.index])) return;
    var msgData = allMessages[event.index];
    var viewMsg = Ti.UI.createWindow({
      url: '/windows/view_message.js'
    });
    viewMsg.addEventListener('open', function () {
      viewMsg.fireEvent('data', {
        data: msgData
      });
    });
    tab.open(viewMsg);
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

}).call(Ti.UI.currentWindow, Ti.UI.currentWindow, Ti.UI.currentTab);