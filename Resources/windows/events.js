Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/eventHandler.js');
(function (window, tab) {
  var createEvent, refreshBtn, mine, club, clubLabel, requery, isRequerying, table, options, ID, allEvents;
  
  ID = "EVENT_OPTIONS";
  options = Util.createSet(Data.getUserClubs());
  
  mine = Ti.UI.iOS.createTabbedBar({
    labels: ['Any', 'Mine'],
    backgroundColor: Util.theme.darkColor,
    style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
    height: 27, index: 0
  });
  
  (function () {
    var toolbar, space, label;
    label = Ti.UI.createLabel({
      text: 'Events for:', color: '#fff'
    });
    space = Ti.UI.createButton({ systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE });
    club = Ti.UI.createButton({ title: "Club:", style: Ti.UI.iPhone.SystemButtonStyle.BORDERED });
    clubLabel = Ti.UI.createLabel({ text: "All", color: "#fff", width: 150 });
    toolbar = Ti.UI.iOS.createToolbar({
      items: [club, clubLabel, space, mine],
      bottom: 0, left: 0, right: 0, barColor: Util.theme.darkColor
    });
    window.add(toolbar);
    
    club.addEventListener('click',function(event){
      var viewEvent = Ti.UI.createWindow({
        url: '/windows/pickerWindow.js',
        opacity: 0
      });
      viewEvent.addEventListener('save', function (result) {
        var value = result.data;
        clubLabel.text = value;
        toolbar.items = toolbar.items;
        Ti.API.log(result);
        Ti.API.log(value);
        if (value === "All") {
        	options = Util.createSet(Data.getUserClubs());
        } else {
        	options = Util.createSet([value]);
        }
        Ti.API.log(options);
        requery();
      });
      viewEvent.addEventListener('close', function () { viewEvent.close({ opacity: 0, duration: 500 }); });
      viewEvent.addEventListener('open', function () {
        var titles = Util.keys(Data.getUserClubs());
        titles.unshift("All");

        var add = Util.foreach(titles, function (_, title) {
          return Ti.UI.createPickerRow({ title: title });
        });
        viewEvent.fireEvent('data', {
          data: {
            type:'club',
            add:add
          }
        });
        viewEvent.animate({
          opacity: 1,
          duration: 500
        });
      });
      viewEvent.open();
    });
    
  })();

  table = Ti.UI.createTableView({ top: 0, bottom: 41 });
  table.addEventListener('click', function (event) {
  	Ti.API.log(event);
    if (!(event.index in allEvents)) return;
    var eventData = allEvents[event.index];
    var viewEvent = Ti.UI.createWindow({
      url: '/windows/view_event.js'
    });
    viewEvent.addEventListener('open', function () {
      viewEvent.fireEvent('data', {
        data: eventData
      });
    });
    tab.open(viewEvent);
  });
  window.add(table);
  
  isRequerying = false;
  requery = function () {
    Ti.API.log(' requery: '+ isRequerying);
    Ti.API.log(options);
    if (isRequerying) return;
    isRequerying = true;
     table.data = [];
    Ti.API.log(Util.createSet(Data.getUserClubs()));
    
    if (options.length == 1){
      Events.queryClub(options, function (events) {
        allEvents = events;
    	  table.data = Util.foreach(events, function (index, event) {
    		  return Ti.UI.createTableViewRow({ title: event.name, height: 40 });
    	  });
    	  isRequerying = false;
      });
    }else{
    	var keys = Util.keys(options);
    	Util.foreach(keys, function(index, club){
    		var clubObj = Util.createSet([club]);
    		Events.queryClub(clubObj, function(events){
    			allEvents = events;
    			Util.foreach(allEvents, function (index, event){
    				var row = Ti.UI.createTableViewRow({ title: event.name, height: 40 });
    				table.appendRow(row);
    			});
    		});
    		isRequerying = false;
    	});
    }
    

  };
  
  requery();

  createEvent = Ti.UI.createButton({
    title: "New Event"
  });
  createEvent.addEventListener('click', function () {
    var newEvent;
    newEvent = Ti.UI.createWindow({ url: '/windows/new_event.js' });
    newEvent.open({ transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT });
    newEvent.addEventListener('close', function () {
      requery();
    });
  });
  window.addEventListener('focus', function () {
    window.rightNavButton = Util.isEmptyObject(Data.getUserClubs()) ? undefined : createEvent;
  });
  
  refreshBtn = (window.leftNavButton = Ti.UI.createButton({
    title: 'Refresh'
  }));
  refreshBtn.addEventListener('click', function () {
    requery(); 	
  });
  
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow, Ti.UI.currentTab);
