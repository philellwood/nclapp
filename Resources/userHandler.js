Ti.include('data.js');
Ti.include('cocoafish.js');
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
    custom_fields: JSON.stringify(Data.getUserClubs()) //arrays cant be queried, so store clubs as string
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

Users.getUsersFromClub = function(_club, _callback){
  var sdk = new Cocoafish('1PlafvOb0KsfJhWw68tWkGiVt3IkhjxR');  // app key
  var data = {
    where: '{'+_club+' : '+_club+'}'
  };
  sdk.sendRequest('users/query.json', 'GET', data, function(){
    if(data) {
      if(data.meta) {
        var meta = data.meta;
        if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'queryUsers') {
        
          Ti.API.log(data.response.users);
          users = Data.response.users;
          _callback(users);
        }
      }
    }  	
  });
};
