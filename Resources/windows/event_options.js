Ti.include('/data.js');
Ti.include('/util.js');

(function (window) {
  var cancel, save, options, ID, queryObject, selectedIndex, myEvents;
  
  ID = "EVENT_OPTIONS";
  
  window.updateLayout({
    title: 'Events Options',
    backgroundColor: '#fff',
    barColor: '#000'
  });
  
  cancel = (window.leftNavButton = Ti.UI.createButton({
    title: "Cancel"
  }));
  cancel.addEventListener('click', function () {
    window.close();
  });
  
  save = (window.rightNavButton = Ti.UI.createButton({
    title: 'Save'
  }));
  save.addEventListener('click', function () {
  	options = Data.load(ID, Util.createSet(Data.getUserClubs()));
  	if(selectedIndex = 0){
  		options = Util.createSet(Data.getUserClubs());
  	}else{
  		options = Util.createSet([clubPicker.getSelectedRow(0)]);
  	}
  	
  
    if(myEvents){
    	Users.showCurrent(function(user){
    		options[id]=user.id;
		    Data.save(ID, options);
		    window.onchange && window.onchange();
		    window.close();
  	    });
    } else {
    	
	    Data.save(ID, options);
	    window.onchange && window.onchange();
	    window.close();
    }
  });
  
  clubPicker = Ti.UI.createPicker({ bottom: 0 });
  window.add(clubPicker);
  clubPicker.add(Util.foreach(Util.keys(Data.getUserClubs()), function (_, title) {
  	return Ti.UI.createPickerRow({ title: title });
  }));
  
  clubPicker.selectionIndicator = true;
  
  clubPicker.addEventListener('change', function (event) {
  	selectedIndex = event.rowIndex;
  })
  
  myEvents = Ti.UI.createSwitch({
    value: false
  });
  window.add(myEvents);
  
 
 
  
  
  
  
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);