Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/eventHandler.js');
(function (window, tab) {
  var createEvent, settings, requery, isRequerying, table, options, ID, allEvents;
  
  ID = "EVENT_OPTIONS";
  
  table = Ti.UI.createTableView();
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
    
    options = Data.load(ID, Util.createSet(Data.getUserClubs()));
    
    Events.queryClub(options, function (events) {
      allEvents = events;
    	table.data = Util.foreach(events, function (index, event) {
    		return Ti.UI.createTableViewRow({ title: event.name, height: 40 });
    	});
    	isRequerying = false;
    });
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
    requery();
  });
  
  settings = (window.leftNavButton = Ti.UI.createButton({
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
