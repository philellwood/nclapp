Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/eventHandler.js');
(function (window) {
  var createEvent, settings, requery, table, options, ID, allEvents;
  
  ID = "EVENT_OPTIONS";
  
  table = Ti.UI.createTableView();
  table.addEventListener('click', function (event) {
    var eventData = allEvents[0];
    var viewEvent = Ti.UI.createWindow({
      url: '/windows/view_event.js',
      opacity: 0
    });
    viewEvent.addEventListener('open', function () {
      viewEvent.fireEvent('data', {
        data: eventData
      });
      viewEvent.animate(Ti.UI.createAnimation({
        opacity: 1,
        duration : 200
      }));
    });
    viewEvent.open();
  });
  window.add(table);
  
  requery = function () {
    Ti.API.info("REQUERYING!");

    options = Data.load(ID, Util.createSet(Data.getUserClubs()));
    
    Events.queryClub(options, function (events) {
      allEvents = events;
    	table.data = Util.foreach(events, function (index, event) {
    		return Ti.UI.createTableViewRow({ title: event.name });
    	});
    });
  };
  
  requery();

  createEvent = Ti.UI.createButton({
    title: "New Event"
  });
  createEvent.addEventListener('click', function () {
    Ti.UI.createWindow({
      url: '/windows/new_event.js',
      modal: true
    }).open();
  });
  window.addEventListener('focus', function () {
    window.rightNavButton = Util.isEmptyObject(Data.getUserClubs()) ? undefined : createEvent;
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
  
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);
