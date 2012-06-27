Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/windows/main.js');

Ti.UI.setBackgroundColor('#000');

var loginWindow = Ti.UI.createWindow({
  url: '/windows/login.js'
});
loginWindow.addEventListener('open', function () {
  loginWindow.fireEvent('setSuccess', { success: showMain });
});
loginWindow.open();
