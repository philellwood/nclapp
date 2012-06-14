var Cloud = require('ti.cloud');

Ti.UI.setBackgroundColor('#000');

var tabGroup,
    feedWindow,
    feedTab,
    societiesWindow,
    societiesTab;


//  The Feed Page
Feed_Page: {
  feedWindow = Ti.UI.createWindow({  
      title: 'Your Feed',
      backgroundColor: '#fff',
      url: 'windows/feed.js'
  });
  feedTab = Ti.UI.createTab({  
      icon: 'KS_nav_views.png',
      title: 'Your Feed',
      window: feedWindow
  });
};

//  The Societies Page
Societies_Page: {
  societiesWindow = Ti.UI.createWindow({  
      title: 'Societies',
      backgroundColor: '#fff',
      url: 'windows/societies.js'
  });
  societiesTab = Ti.UI.createTab({  
      icon: 'KS_nav_ui.png',
      title: 'Societies',
      window: societiesWindow
  });
};

//  Create a new tab group
tabGroup = Ti.UI.createTabGroup();

//  Add the tabs
tabGroup.addTab(feedTab);  
tabGroup.addTab(societiesTab);  

//  Show the tab group
tabGroup.open();
