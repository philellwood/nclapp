Ti.include('/util.js');
Ti.include('/data.js');

(function (window) {
  var title, container, username, password, icons, login, register, rememberMe, overlay, successFn, loginAction;
  
  overlay = require("/windows/overlay").Create({ message: "Loading..." });
  successFn = Util.empty;
  
  window.updateLayout({
    backgroundColor: Util.theme.darkColor
  });
  
  window.addEventListener('setSuccess', function (event) {
    successFn = event.success;
  });
  
  title = Ti.UI.createLabel({
    top: 0, height: 60,
    left: 0, right: 0,
    text: 'NCL App',
    textAlign: 'center',
    color: '#fff',
    font: { fontSize: 18, fontWeight: 'bold' }
  });
  
  container = Ti.UI.createView({
    top: 43,
    width: 320, height: 201
  });
  window.add(container);
  
  
  container.add(Ti.UI.createLabel({
    text: 'Remember me:',
    top: 90, height: 30,
    left: 10, width: 150,
    color: '#fff'//'#333'
  }));
  rememberMe = Ti.UI.createSwitch({
    top: 90, height: 30, right: 10,
    value: Data.load("RememberMe", false)
  });
  rememberMe.addEventListener('change', function (e) {
    Ti.API.info('Switch value: ' + rememberMe.value);
  });
  
  container.add(Ti.UI.createLabel({
    top: 10, height: 30,
    left: 10, width: 100,
    text: 'Username:',
    color: '#fff'//'#333'
  }));
  username = Ti.UI.createTextField({
    top: 10, height: 30,
    left: 110, right: 10,
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
    backgroundColor: '#fff', clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS,
    value: rememberMe.value ? Data.load("login", '') : ''
  });
  
  window.addEventListener('open', function () {
    username.focus();
  });
  
  container.add(Ti.UI.createLabel({
    top: 50, height: 30,
    left: 10, width: 100,
    text: 'Password:',
    color: '#fff'//'#333'
  }));
  password = Ti.UI.createTextField({
    top: 50, height: 30,
    left: 110, right: 10,
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL,
    backgroundColor: '#fff', clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS,
    passwordMask: true,
    value: rememberMe.value ? Data.load("password", '') : ''
  });
  
  icons = Ti.UI.createLabel({
    text: "Icons courtesy of Glyphish",
    bottom: 10, left: 0, right: 0,
    font: { fontSize: 12, fontWeight: 'bold' },
    textAlign: 'center', color: '#fff'//'#333'Util.theme.mainColor,
  });
  
  container.add(username, password, rememberMe, icons);
  
  (function () {
    var toolbar, space;
    space = Ti.UI.createButton({ systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE });
    login = Ti.UI.createButton({
      // top: 90, right: 10,
      title: 'Login',
      style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
    });
    register = Ti.UI.createButton({
      // top: 90, left: 10,
      title: 'Register',
      style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
    });
    
    toolbar = Ti.UI.iOS.createToolbar({
      items: [register, space, title, space, login],
      top: -1, left: 0, right: 0,
      barColor: Util.theme.mainColor
    })
    window.add(toolbar);
  })();
  
  login.addEventListener('click', function () {
    loginAction();
  });
  register.addEventListener('click', function () {
  	Ti.API.log('register clicked')
    overlay.Show();
    Users.logout(function(){  
      Ti.API.log("logout callback");
      Users.create({
  		  username: username.getValue(),
  		  password: password.getValue(),
  		  confirmPassword: password.getValue()
  	  }, function () {
  	  	alert("Successfully registered.");
  	    Data.removeAllClubs();
  	    //hideOverlay();
  	    loginAction();
  	  }, function () {
  	    alert("Couldn't register.");
        overlay.Hide();
  	  });
  	});
  });
  
  loginAction = function () {
    Data.save("login",      username.getValue());
  	Data.save("password",   password.getValue());
  	Data.save("RememberMe", rememberMe.value);
  	overlay.Show();
  	Users.login({
      login:    Data.load("login",    ''),
      password: Data.load("password", '')
  	}, function (users) {
      overlay.Hide();
  	  window.fireEvent('login');
  	  Ti.API.log(users.id);
      Data.save("userID", users.id);
  	}, function () {
      overlay.Hide();
  	  alert("Couldn't log in.");
  	});
  };
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);
