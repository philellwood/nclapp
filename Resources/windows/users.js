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
Ti.currentWindow.add(username);
Ti.currentWindow.add(password);
Ti.currentWindow.add(createButton);

