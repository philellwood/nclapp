Ti.include('/util.js');
exports.Create = function (input) {
  var win, actInd, showAnim, hideAnim, options;
  options = input || {};
  
  //  Standard window
  win = Ti.UI.createWindow({
    backgroundColor: Util.theme.mainColor
  });
  
  //  Activity indicator
  actInd = Ti.UI.createActivityIndicator({
    message: options.message,
    color: '#fff',
    style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG
  });
  win.add(actInd);
  
  //  Define the showing animation
  showAnim = Ti.UI.createAnimation({
    opacity: 0.8,
    duration: 200
  });
  
  //  Define the hiding animation
  hideAnim = Ti.UI.createAnimation({
    opacity: 0,
    duration: 200
  });
  
  //  Define the event chainings
  hideAnim.addEventListener('complete', function () {
    actInd.hide();
  });
  
  //  Shows the overlay
  win.Show = function () {
    win.open();
    actInd.show();
    win.animate(showAnim);
  };
  //  Hides the overlay
  win.Hide = function() {
    win.animate(hideAnim);
  };
  
  //  Initial state
  win.opacity = 0;
  
  return win;
};