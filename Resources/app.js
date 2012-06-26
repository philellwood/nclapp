Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/windows/main.js');

Ti.UI.setBackgroundColor('#000');

Ti.UI.createWindow({
  url: '/windows/login.js',
  success: showMain
}).open();
