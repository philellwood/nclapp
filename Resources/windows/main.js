Ti.include('/data.js');
Ti.include('/util.js');

var createMainWindow = function () {
  Data.getCloudClubs();
  
  var group = Ti.UI.createTabGroup({
    tabs: Util.foreach([
      { 'title': "Messages",
        'url': "windows/messages.js",
        'icon': "/images/08-chat.png" },

      { 'title': "Events",
        'url': "windows/events.js",
        'icon': "/images/88-beer-mug.png" },

      { 'title': "Clubs",
        'url': "windows/clubs.js",
        'icon': "/images/112-group.png" },

      { 'title': "Settings",
      	'url': "windows/settings.js",
      	'icon': "/images/157-wrench.png" }

    ], function (_, item) {
      var window;
      
      window = Ti.UI.createWindow({
        'title': item.title || 'No title',
        'url': item.url || '',
        'backgroundColor': '#fff',
        'barColor': Util.theme.mainColor
      });
      
      window.addEventListener('logout', function () {
        group.fireEvent('logout');
      });

      return Ti.UI.createTab({
        'title': item.title,
        'icon': item.icon,
        'window': window
      });
    })
  });
  
  return group;
};