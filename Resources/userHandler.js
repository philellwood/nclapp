var Cloud = require('ti.cloud');
Cloud.debug = true;

var Users = {};

Users.create = function(_data){
	Cloud.Users.create({
    username: _data.username,
    password: _data.password,
    password_confirmation: _data.confirmPassword,
    //first_name: firstName.value,
    //last_name: lastName.value,
    custom_fields: '{"clubs":""}' //arrays cant be queried, so store clubs as string
}, function (e) {
    if (e.success) {
		Ti.API.log(e);
    } else {
        Ti.API.error(e);// oops, something went wrong
    }
});
};

Users.login = function(_data){
	Cloud.Users.login({
      login: _data.login,
      password: _data.password
    }, function (e) {
      if (e.success) {
        var user = e.users[0];
        Ti.API.log('Success:\\n' +
            'id: ' + user.id + '\\n' +
            'first name: ' + user.first_name + '\\n' +
            'last name: ' + user.last_name);
      } else {
        Ti.API.error('Error:\\n' +
            ((e.error && e.message) || JSON.stringify(e)));
      }
    });
	
};

Users.showCurrent = function(){
	Cloud.Users.showMe(function (e) {
      if (e.success) {
        var user = e.users[0];
        Ti.API.log(user);
        return user;
      } else {
        Ti.API.error('Error:\\n' +
            ((e.error && e.message) || JSON.stringify(e)));
      }
    });
};

Users.update = function(_data){
  Cloud.Users.update(
  	_data,
  	function (e) {
    if (e.success) {
        var user = e.users[0];
        Ti.API.log(user);
    } else {
        Ti.API.error('Error:\\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
  });
	
};
