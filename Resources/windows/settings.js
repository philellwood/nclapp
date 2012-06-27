Ti.include('/util.js');

(function (window) {
  
  var logout;
  
  logout = (window.rightNavButton = Ti.UI.createButton({
    title: 'Logout'
  }));
  logout.addEventListener('click', function () {
    window.fireEvent('logout');
  });
  
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);