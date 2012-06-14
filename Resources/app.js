Ti.include('/util.js');

Ti.UI.setBackgroundColor('#000');

Util.buildTabGroup([

  { 'title': "Your Feed",
    'url': "windows/feed.js",
    'icon': "KS_nav_views.png" },

  { 'title': "Clubs",
    'url': "windows/clubs.js",
    'icon': "KS_nav_ui.png" }

]).open();
