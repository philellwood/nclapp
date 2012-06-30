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
  
  
  cancel = Ti.UI.createButton({ title: "Cancel", style: Ti.UI.iPhone.SystemButtonStyle.BORDERED });
  cancel.addEventListener('click', function () {
    var dialog = Ti.UI.createAlertDialog({
      title: 'Cancel', message: 'Discard message?', buttonNames: ['No', 'Yes'], cancel: 0
    });
    dialog.addEventListener('click', function (e) {
      if (e.cancel === e.index || e.cancel === true) {
        return;
      }
      if (e.index === 1) {
        window.close({
          transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
        });
      }
    });
    dialog.show();
  });
  
  send = Ti.UI.createButton({ title: "Send", style: Ti.UI.iPhone.SystemButtonStyle.BORDERED });
  send.addEventListener('click', function () {
        var dialog = Ti.UI.createAlertDialog({
      title: 'Create', message: 'Create this event?', buttonNames: ['No', 'Yes'], cancel: 0
    });
    dialog.addEventListener('click', function (e) {
      if (e.cancel === e.index || e.cancel === true) {
        return;
      }
      if (e.index === 1) {
        Messages.create({
          subject : subject.getValue(),
          body : message.getValue(),
          club : club.getValue()
        }, function () {
          window.close({
            transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
          });
          alert("Your event has been created!");
        }, function (data) {
          alert('An error occurred!');
          alert(JSON.stringify(data));
        });
      }
    });
    dialog.show();
  });
  
  (function () {
    var toolbar, flexSpace, title;
    flexSpace = Ti.UI.createButton({ systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE });
    title = Ti.UI.createLabel({ text: 'New Message', font: { fontSize: 18, fontWeight: 'bold' }, color: '#fff' });
    toolbar = Ti.UI.iOS.createToolbar({
      items: [cancel, flexSpace, title, flexSpace, send], top: -1, barColor: Util.theme.mainColor
    });
    window.add(toolbar);
  })();
  
  view = Ti.UI.createScrollView();
  window.add(view);
  
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