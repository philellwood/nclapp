Ti.include('/util.js');
var WindowManager = function (data) {
  var THIS, currentWindow, currentConstructor;
  THIS = this;
  if (Util.typeIs(data.launch, "String")) {
    THIS.launch = function () {
      THIS.open(data.launch);
    };
  } else {
    THIS.launch = data.launch || function () { };
  }
  THIS.windows = data.windows || {};
  THIS.events = data.events || {};
  THIS.close = function () {
    var thisWindow, thisClose, anim;
    if (currentWindow) {
      currentWindow.close();
    }  
    currentWindow = undefined;
  };
  THIS.open = function (name, props, message) {
    var constructor, thisWindow, that;
    if (!(name in THIS.windows)) {
      throw new Error("Window doesn't exist: " + name);
    }
    constructor = THIS.windows[name];
    if (constructor) {
      currentConstructor = constructor;
      if (Util.typeIs(constructor.init, "String")) {
        thisWindow = Ti.UI.createWindow({
          url: constructor.init
        });
      } else if (Util.typeIs(constructor.init, "Function")) {
        thisWindow = constructor.init();
      }
      thisWindow.addEventListener('open', function () {
        THIS.close();
        currentWindow = thisWindow;
        THIS.attachEvents();
        currentWindow.fireEvent('construct', {
          data: message
        });
      });
      thisWindow.open(Util.merge(constructor.open||{}, props||{}));
    } else {
      throw new Error("Couldn't construct window: " + name);
    }
  };
  THIS.attachEvents = function () {
    var key, events;
    if (currentWindow) {
      Util.forin(THIS.events, function (key, value) {
        var fn = Util.typeIs(value, "String") ? function () { THIS.open(value); } : value;
        currentWindow.addEventListener(key, fn);
      }, THIS);
    }
  };
};