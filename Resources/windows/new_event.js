Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/clubs_data.js');
Ti.include('/messageHandler.js');
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
    Ti.API.log("TODO");
    window.close();
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
  	top:45, left:5, text:'Event Name:'
  });
  window.add(dateLabel);
  
  date = Ti.UI.createTextField({
  	top:45, left:120, height: 30, width:150,
  	borderWidth: 1, borderColor: '#bbb', borderRadius: 3
  });
  window.add(date);
  
  date.addEventListener('focus',function(){
  	infoWin.open();
  })
  
  infoWin = Ti.UI.createWindow({modal:true});
  datePicker = Ti.UI.createPicker({
  	type:Titanium.UI.PICKER_TYPE_DATE_AND_TIME,
  	minDate: new Date(),
  	value: new Date(),
  });
  
  infoWin.add(datePicker);
  
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