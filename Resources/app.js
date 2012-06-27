Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/windows/main.js');

Ti.UI.setBackgroundColor(Util.theme.mainColor);

Ti.include('/windowManager.js');

var App = new WindowManager({
  launch: "login",
  windows: {
    "login": {
      init: '/windows/login.js',
      open: { transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN }
    },
    "main": {
      init: createMainWindow,
      open: { transition: Ti.UI.iPhone.AnimationStyle.CURL_UP }
    }
  },
  events: {
    "login":  "main",
    "logout": "login"
  }
});
App.launch();


////  PREVIOUS VERSIONS:

// var App, loginWindow, mainWindow;
// App = {
//   launch: function () {
//     App.showLogin();
//   },
//   login: function () {
//     loginWindow.close();
//     loginWindow = undefined;
//     App.showMain();
//   },
//   logout: function () {
//     mainWindow.close();
//     mainWindow = undefined;
//     App.showLogin();
//   },
//   showLogin: function () {
//     loginWindow = Ti.UI.createWindow({
//       url: '/windows/login.js'
//     });
//     loginWindow.addEventListener('login', function () {
//       App.login();
//     });
//     loginWindow.open();
//   },
//   showMain: function () {
//     mainWindow = createMainWindow();
//     mainWindow.addEventListener('logout', function () {
//       App.logout();
//     });
//     mainWindow.open();
//   }
// };
// 
// App.launch();
// 
// 
// 
// 
// var App, currentWindow;
// App = {
//   launch: function () {
//     App.loadLogin();
//   },
//   unloadCurrent: function () {
//     if (currentWindow) {
//       currentWindow.close();
//     }
//     currentWindow = undefined;
//   },
//   loadLogin: function () {
//     App.unloadCurrent();
//     currentWindow = Ti.UI.createWindow({
//       url: '/windows/login.js'
//     });
//     currentWindow.addEventListener('login', function () {
//       App.loadMain();
//     });
//     currentWindow.open();
//   },
//   loadMain: function () {
//     App.unloadCurrent();
//     currentWindow = createMainWindow();
//     currentWindow.addEventListener('logout', function () {
//       App.loadLogin();
//     });
//     currentWindow.open();
//   }
// };
// App.launch();
