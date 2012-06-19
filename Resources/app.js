Ti.include('/util.js');

Ti.UI.setBackgroundColor('#000');

Util.buildTabGroup([

  { 'title': "Messages",
    'url': "windows/messages.js",
    'icon': "KS_nav_views.png" },

  { 'title': "Events",
    'url': "windows/events.js",
    'icon': "KS_nav_views.png" },

  { 'title': "Clubs",
    'url': "windows/clubs.js",
    'icon': "KS_nav_ui.png" }

]).open();
