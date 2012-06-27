Ti.include('/util.js');
Ti.include('/data.js');

(function (window) {
  var container, username, password, login, register, rememberMe, successFn, showOverlay, hideOverlay, loginAction;
  
  successFn = Util.empty;
  
  (function () {
    var overlay, showAnim, hideAnim, actInd;
    
    //  Create the overlay window
    overlay = Ti.UI.createWindow({
      backgroundColor: '#123',
      opacity: 0
    });
    actInd = Ti.UI.createActivityIndicator({
      message: 'Loading...',
      color: '#fff',
      style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG
    });
    overlay.add(actInd);
    
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
    overlay.addEventListener('open', function () {
      actInd.show();
      overlay.animate(showAnim);
    });
    hideAnim.addEventListener('complete', function () {
      actInd.hide();
      overlay.close();
    });
    
    showOverlay = function () {
      overlay.open();
    };
    hideOverlay = function() {
      overlay.animate(hideAnim);
    };
  })();
  
  window.updateLayout({
    backgroundColor: '#345'
  });
  
  window.addEventListener('setSuccess', function (event) {
    successFn = event.success;
  });
  
  window.add(Ti.UI.createLabel({
    top: 15, height: 30,
    text: 'NCL App',
    color: '#fff',
    font: { fontSize: 24, fontWeight: 'bold' }
  }));
  
  window.add(Ti.UI.createLabel({
    text: '   Remember me:',
    top: 195, height: 45,
    left: 20, right: 20,
    color: '#fff',
    backgroundColor: '#000'
  }));
  rememberMe = Ti.UI.createSwitch({
    top: 205, right: 30,
    value: Data.load("RememberMe", false)
  });
  rememberMe.addEventListener('change', function (e) {
    Ti.API.info('Switch value: ' + rememberMe.value);
  });
  window.add(rememberMe);
  
  container = Ti.UI.createView({
    top: 60,
    width: 280, height: 135,
    backgroundColor: '#fff'
  });
  window.add(container);
  
  container.add(Ti.UI.createLabel({
    top: 10, height: 30,
    left: 10, width: 100,
    text: 'Username:',
    color: '#333'
  }));
  username = Ti.UI.createTextField({
    top: 10, height: 30,
    left: 110, right: 10,
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
    value: rememberMe.value ? Data.load("login", '') : ''
  });
  
  container.add(Ti.UI.createLabel({
    top: 50, height: 30,
    left: 10, width: 100,
    text: 'Password:',
    color: '#333'
  }));
  password = Ti.UI.createTextField({
    top: 50, height: 30,
    left: 110, right: 10,
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
    passwordMask: true,
    value: rememberMe.value ? Data.load("password", '') : ''
  });
  
  login = Ti.UI.createButton({
    top: 90, right: 10,
    title: 'Login'
  });
  login.addEventListener('click', function () {
    loginAction();
  });
  
  register = Ti.UI.createButton({
    top: 90, left: 10,
    title: 'Register'
  });
  register.addEventListener('click', function () {
    showOverlay();
    Users.create({
  		username: username.getValue(),
  		password: password.getValue(),
  		confirmPassword: password.getValue()
  	}, function () {
  	  loginAction();
  	}, function () {
  	  alert("Couldn't register.");
  	  hideOverlay();
  	});
  });
  
  container.add(username, password, login, register);
  
  loginAction = function () {
    Data.save("login",      username.getValue());
  	Data.save("password",   password.getValue());
  	Data.save("RememberMe", rememberMe.value);
    showOverlay();
  	Users.login({
      login:    Data.load("login",    ''),
      password: Data.load("password", '')
  	}, function(){
      successFn();
      hideOverlay();
      window.close();
  	});
  };
  
  
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);