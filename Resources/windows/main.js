Ti.include('/data.js');
Ti.include('/util.js');

var showMain = function () {
  
  Data.getCloudClubs();
  
  Util.buildTabGroup([

    { 'title': "Messages",
      'url': "windows/messages.js",
      'icon': "/images/08-chat.png" },

    { 'title': "Events",
      'url': "windows/events.js",
      'icon': "/images/88-beer-mug.png" },

    { 'title': "Clubs",
      'url': "windows/clubs.js",
      'icon': "/images/112-group.png" },
    
    {
    	'title': "Settings",
    	'url': "windows/settings.js",
    	'icon': "/images/157-wrench.png"}

  ]).open();
};