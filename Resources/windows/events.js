Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/eventHandler.js');
(function (window, tab) {
  var createEvent, refresh, settings, clubpicker, clubLabel, club, requery, isRequerying, table, options, ID, allEvents;
  
  ID = "EVENT_OPTIONS";
  options = Data.load(ID, Util.createSet(Data.getUserClubs()));
  
  
  settings = (Ti.UI.createButton({
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
  
  (function () {
    var toolbar, space, label;
    label = Ti.UI.createLabel({
      text: 'Events for:', color: '#fff'
    });
    space = Ti.UI.createButton({ systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE });
    club = Ti.UI.createButton({ title: 'Club: All', style: Ti.UI.iPhone.SystemButtonStyle.BORDERED });
    toolbar = Ti.UI.iOS.createToolbar({
      items: [club, space, settings],
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
        club.updateLayout({ title: "Club: " + value });
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

  (function () {
    var clubview, titles, items;
    titles = Util.keys(Data.getUserClubs());
    titles.unshift("All");
    items = Util.foreach(titles, function (_, title) {
      return Ti.UI.createPickerRow({ title: title });
    });
    clubpicker = Ti.UI.createPicker({
      transform: Ti.UI.create2DMatrix().scale(0.5), width: 680,
      top: -59, selectionIndicator: true
    });
    clubpicker.add(items);

    clubview = Ti.UI.createView({
      top: 0, height: 88, left: 0, right: 0
    });
    clubview.add(clubpicker);
    window.add(clubview);
  });
  
  
  
  
  
  
  clubLabel = Ti.UI.createLabel({
  	top:5, left:5, text:'From Club:'
  });
  // window.add(clubLabel);
  
  club = Ti.UI.createTextField({
  	top:5, left:100, height: 30, width:130,
  	borderWidth: 1, borderColor: '#bbb', borderRadius: 3 	
  });
  // window.add(club);
  
  club.addEventListener('focus',function(event){
    var viewEvent = Ti.UI.createWindow({
      url: '/windows/pickerWindow.js',
      opacity: 0
    });
    viewEvent.addEventListener('save', function (result) {
      club.value = result.data;
      if (club.getValue() === "All"){
      	options = Data.load(ID, Util.createSet(Data.getUserClubs()));
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
  
  table = Ti.UI.createTableView({ top: 0, bottom: 41 });
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
    if (isRequerying) return;
    isRequerying = true;
    
    Ti.API.log('options', options);
    
    Events.queryClub(options, function (events) {
      allEvents = events;
    	table.data = Util.foreach(events, function (index, event) {
    		return Ti.UI.createTableViewRow({ title: event.name, height: 40 });
    	});
    	isRequerying = false;
    });
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
  
  refresh = (window.leftNavButton = Ti.UI.createButton({
    title: "Refresh",
    style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
  }));
  refresh.addEventListener('click', function () {
    requery();
  });

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
