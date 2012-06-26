Ti.include('/data.js');

(function (window) {
  var container, username, password, login, register, rememberMe;
  
  window.updateLayout({
    backgroundColor: '#345'
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
    Data.save("login",      username.getValue());
  	Data.save("password",   password.getValue());
  	Data.save("RememberMe", rememberMe.value);
  	Users.login({
  		login:    Data.load("login",    ''),
  		password: Data.load("password", '')
  	}, function(){
      window.close();
      setTimeout(function () {
        window.success();
      }, 0);
  	});
  });
  
  register = Ti.UI.createButton({
    top: 90, left: 10,
    title: 'Register'
  });
  register.addEventListener('click', function () {
    Users.create({
  		username: username.getValue(),
  		password: password.getValue(),
  		confirmPassword: password.getValue()
  	});
  });
  
  container.add(username, password, login, register);
  
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);