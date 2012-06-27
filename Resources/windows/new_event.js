Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/clubs_data.js');
Ti.include('/messageHandler.js');
Ti.include('/eventHandler.js');
(function (window) {
  var view, cancel, create, nameLabel, name, datePicker, clubPicker, infoWin;
  
  window.updateLayout({
    title: "New Event",
    backgroundColor: '#fff',
    barColor: '#456',
    layout: 'vertical'
  });
  
  cancel = (window.leftNavButton = Ti.UI.createButton({
    title: "Cancel",
    style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
  }));
  cancel.addEventListener('click', function () {
    window.close({
      transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
    });
  });
  
  create = (window.rightNavButton = Ti.UI.createButton({
    title: "Create",
    style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
  }));
  create.addEventListener('click', function () {
    Events.create({
    	name: name.getValue(),
    	start_time: date.getValue(),
    	club: club.getValue(),
    	details: descr.getValue()
    }, function () {
    	window.close({
        transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
      });
      alert("Your event has been created!");
    }, function (data) {
      alert('An error occurred!');
      alert(JSON.stringify(data));
    });
  });
  
  (function () {
    var toolbar, flexSpace, title;
    flexSpace = Ti.UI.createButton({ systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE });
    title = Ti.UI.createLabel({ text: 'New Event', font: { fontSize: 18, fontWeight: 'bold' }, color: '#fff' });
    toolbar = Ti.UI.iOS.createToolbar({
      items: [cancel, flexSpace, title, flexSpace, create], top: -1, barColor: '#123'
    });
    window.add(toolbar);
  })();
  
  view = Ti.UI.createScrollView();
  window.add(view);
  
  nameLabel = Ti.UI.createLabel({
  	top:10, left:5, text:'Event Name:'
  });
  view.add(nameLabel);
  name = Ti.UI.createTextField({
  	top:10, left:120, height: 30, width:150,
  	borderWidth: 1, borderColor: '#bbb', borderRadius: 3
  });
  view.add(name);

  dateLabel = Ti.UI.createLabel({
  	top:45, left:5, text:'Event Date:'
  });
  view.add(dateLabel);
  
  date = Ti.UI.createTextField({
  	top:45, left:120, height: 30, width:150,
  	borderWidth: 1, borderColor: '#bbb', borderRadius: 3
  });
  view.add(date);
  
  date.addEventListener('focus',function(event){
    var viewEvent = Ti.UI.createWindow({
      url: '/windows/pickerWindow.js',
      opacity: 0
    });
    viewEvent.addEventListener('save', function (result) {
      date.value = result.data;
    });
    viewEvent.addEventListener('open', function () {
      viewEvent.fireEvent('data', {
        data: {
          type:Titanium.UI.PICKER_TYPE_DATE_AND_TIME,
          minDate: new Date(),
          value: new Date()
        }
      });
      viewEvent.animate(Ti.UI.createAnimation({
        opacity: 1,
        duration : 200
      }));
    });
    viewEvent.open();
  }); 
  	
  clubLabel = Ti.UI.createLabel({
  	top:80, left:5, text:'Club:'
  });
  view.add(clubLabel);
  
  club = Ti.UI.createTextField({
  	top:80, left:120, height: 30, width:150,
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
    viewEvent.addEventListener('open', function () {
      viewEvent.fireEvent('data', {
        data: {
          type:'club'
        }
      });
      viewEvent.animate(Ti.UI.createAnimation({
        opacity: 1,
        duration : 200
      }));
    });
    viewEvent.open();
  }); 

  descrLabel = Ti.UI.createLabel({
  	top:125, left:5, text:'Event Description:'
  });
  view.add(descrLabel);
  
  descr = Ti.UI.createTextArea({
  	top:150, left:10, bottom: 10, width:300,
  	borderWidth: 1, borderColor: '#bbb', borderRadius: 3
  });
  view.add(descr); 
/*  clubPicker = Ti.UI.createPicker({ bottom: 0 });
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
*/  
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);