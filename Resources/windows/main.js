Ti.include('/util.js');

var showMain = function () {
  Util.buildTabGroup([

    { 'title': "Messages",
      'url': "windows/messages.js",
      'icon': "KS_nav_views.png" },

    { 'title': "Events",
      'url': "windows/events.js",
      'icon': "KS_nav_views.png" },

    { 'title': "Clubs",
      'url': "windows/clubs.js",
      'icon': "KS_nav_ui.png" },
    
    {
    	'title':"Users",
    	'url': "windows/users.js",
    	'icon': "KS_nav_ui.png"}

  ]).open();
};