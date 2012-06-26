Ti.include('/userHandler.js');
var username = Ti.UI.createTextField({
  borderWidth:2,
  borderColor:'#000',
  top:10,
  width: 300,
  height: 50
});
var password = Ti.UI.createTextField({
  borderWidth:2,
  borderColor:'#000',
  top:70,
  width: 300,
  height: 50,
  passwordMask: true
});

var createButton = Ti.UI.createButton({
  width: 300,
  height: 50,
  title: 'create'
	
});

createButton.addEventListener('click',function(e){
	Users.create({
		username: username.getValue(),
		password: password.getValue(),
		confirmPassword: password.getValue()
	});
	
});
var loginButton = Ti.UI.createButton({
	top:200,
  width: 300,
  height: 50,
  title: 'login'
	
});

loginButton.addEventListener('click',function(e){
	Data.save("login", username.getValue());
	Data.save("password", password.getValue());
	Users.login({
		login: Data.load("login"),
		password: Data.load("password")
		
	}, function(){
		alert("successfully logged in");
	});
	
});
Ti.currentWindow.add(username);
Ti.currentWindow.add(password);
Ti.currentWindow.add(createButton);
Ti.currentWindow.add(loginButton);
