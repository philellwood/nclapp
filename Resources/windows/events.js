Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/eventHandler.js');
(function (window, tab) {
  var createEvent, settings, clubLabel, club, requery, isRequerying, table, options, ID, allEvents;
  
  ID = "EVENT_OPTIONS";
  options = Util.createSet(Data.getUserClubs());
  
  clubLabel = Ti.UI.createLabel({
  	top:5, left:5, text:'Club:'
  });
  window.add(clubLabel);
  
  club = Ti.UI.createTextField({
  	top:5, left:50, height: 20, width:130,
  	borderWidth: 1, borderColor: '#bbb', borderRadius: 3, value:"All"	
  });
  window.add(club);
  
  club.addEventListener('focus',function(event){
    var viewEvent = Ti.UI.createWindow({
      url: '/windows/pickerWindow.js',
      opacity: 0
    });
    viewEvent.addEventListener('save', function (result) {
      club.value = result.data;
      if (club.getValue() === "All"){
      	options = Util.createSet(Data.getUserClubs());
      }else{
      	options = Util.createSet([club.getValue()]);
      }
      Ti.API.log(options);
      requery();
    });
    viewEvent.addEventListener('close', function () {
      viewEvent.close({ opacity: 0, duration: 500 });
    });
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
  
  mineLabel = Ti.UI.createLabel({
  	top:5, left:185, text:'Mine:'
  });
  window.add(mineLabel);
  
  mine = Ti.UI.createSwitch({
  	top:5, left:230, height:20, width:60,
    value: false
  });
  window.add(mine);
  
  table = Ti.UI.createTableView({top:35});
  table.addEventListener('click', function (event) {
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
    // viewEvent.open();
  });
  window.add(table);
  
  isRequerying = false;
  requery = function () {
    // Ti.API.info("REQUERYING!");
    
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
    			Util.foreach(events, function (index, event){
    				var row = Ti.UI.createTableViewRow({ title: event.name, height: 40 });
    				table.appendRow(row);
    			});
    		});
    		isRequerying = false;
    	});
    }
    

  };
  
  //requery();

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
    requery();
  });
  
  refreshBtn = (window.leftNavButton = Ti.UI.createButton({
    title: 'Refresh'
  }));
  refreshBtn.addEventListener('click', function () {
    requery(); 	
  });
  
/*  settings = (window.leftNavButton = Ti.UI.createButton({
    title: "Options",
    style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
  }));
  settings.addEventListener('click', function () {
    Ti.UI.createWindow({
      url: '/windows/event_options.js',
      modal: true,
      onchange: requery
    }).open();
  });
*/
  // clubsView = createEventsClubs();
  //   mineView = createEventsMine();
  // 
  //   scrollableView = Ti.UI.createScrollableView({
  //     views: [clubsView, mineView],
  //     bottom: 0
  //   });
  //   scrollableView.addEventListener('scroll', function (event) {
  //     Util.foreach(toolbarButtons, function (_, btn) {
  //       btn.backgroundColor = '#fff'; //.style = Ti.UI.iPhone.SystemButtonStyle.BORDERED; //enabled = true;
  //     });
  //     toolbarButtons[event.currentPage].backgroundColor = '#000'; //.style = Ti.UI.iPhone.SystemButtonStyle.DONE; //enabled = false;
  //   });
  // 
  //   var toolbarButtons = [];
  //   window.toolbar = Util.foreach([
  //     { type: 'button', title: 'Subscribed Events', index: 0 },
  //     { type: 'space' },
  //     { type: 'button', title: 'View My Events', index: 1 }
  //   ], function (_, item) {
  //     var view;
  //     if (item.type === 'button') {
  //       view = Ti.UI.createButton({
  //         title: item.title,
  //         style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
  //         selectedColor: '#123',
  //         backgroundColor: '#fff'
  //       });
  //       view.addEventListener('click', function () {
  //         scrollableView.scrollToView(item.index);
  //       });
  //       toolbarButtons.push(view);
  //     } else if (item.type === 'space') {
  //       view = Ti.UI.createButton({
  //         systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
  //       });
  //     }
  //     return view;
  //   });
  //   toolbarButtons[0].backgroundColor = '#000'; // = Ti.UI.iPhone.SystemButtonStyle.DONE; //.enabled = false;
  //   
  //   // switchBar = Ti.UI.iOS.createTabbedBar({
  //   //   labels: ['Clubs', 'Mine'],
  //   //   backgroundColor: '#336699',
  //   //   bottom: 0,
  //   //   height: 40,
  //   //   style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
  //   //   width: 320
  //   // });
  //   // switchBar.addEventListener('click', function (event) {
  //   //   scrollableView.scrollToView(event.index);
  //   // });
  // 
  //   window.add(scrollableView);
  
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow, Ti.UI.currentTab);
