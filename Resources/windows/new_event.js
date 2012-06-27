Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/clubs_data.js');
Ti.include('/messageHandler.js');
Ti.include('/eventHandler.js');
(function (window) {
  var cancel, create, nameLabel, name, datePicker, clubPicker, infoWin;
  
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
    Events.create({
    	name: name.getValue(),
    	start_time: date.getValue(),
    	club: club.getValue(),
    	details: descr.getValue()
    },function(){
    	window.close();
    })
    
  });
  
  nameLabel = Ti.UI.createLabel({
  	top:10, left:5, text:'Event Name:'
  });
  window.add(nameLabel);
  name = Ti.UI.createTextField({
  	top:10, left:120, height: 30, width:150,
  	borderWidth: 1, borderColor: '#bbb', borderRadius: 3
  });
  window.add(name);

  dateLabel = Ti.UI.createLabel({
  	top:45, left:5, text:'Event Date:'
  });
  window.add(dateLabel);
  
  date = Ti.UI.createTextField({
  	top:45, left:120, height: 30, width:150,
  	borderWidth: 1, borderColor: '#bbb', borderRadius: 3
  });
  window.add(date);
  
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
  window.add(clubLabel);
  
  club = Ti.UI.createTextField({
  	top:80, left:120, height: 30, width:150,
  	borderWidth: 1, borderColor: '#bbb', borderRadius: 3
  });
  window.add(club);
  
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
  window.add(descrLabel);
  
  descr = Ti.UI.createTextArea({
  	top:150, left:10, bottom: 10, width:300,
  	borderWidth: 1, borderColor: '#bbb', borderRadius: 3
  });
  window.add(descr); 
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