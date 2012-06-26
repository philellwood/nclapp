Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/windows/events.clubs.js');
Ti.include('/windows/events.mine.js');

(function (window) {
  var createEvent, clubsView, mineView, switchBar;

  createEvent = (window.rightNavButton = Ti.UI.createButton({
    title: "New Event",
    style: Ti.UI.iPhone.SystemButtonStyle.DONE,
    enabled: false
  }));
  createEvent.addEventListener('click', function () {
    Ti.UI.createWindow({
      url: '/windows/new_event.js',
      modal: true
    }).open();
  });
  
  window.addEventListener('focus', function () {
    createEvent.enabled = !Util.isEmptyObject(Data.getUserClubs());
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
