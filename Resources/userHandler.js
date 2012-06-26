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

Users.login = function(_data, _callback){
	/*Cloud.Users.login({
      login: _data.login,
      password: _data.password
    }, function (e) {
      if (e.success) {
        var user = e.users[0];
        Ti.API.log('Success:\\n' +
            'id: ' + user.id + '\\n' +
            'session_id: ' + e.meta.session_id);
        _callback && _callback();
      } else {
        Ti.API.error('Error:\\n' +
            ((e.error && e.message) || JSON.stringify(e)));
      }
    });*/
  var sdk = new Cocoafish('1iHEqePuYFs3SFXcaVwNIB4nAx3G99Ld','GxvXXCNnjESPojJkCXvGBGdjOJD5kc8k');  // app key
  var postData = {
    login: _data.login, 
    password: _data.password
  };
  sdk.sendRequest('users/login.json', 'POST', postData, function(data){
    if(data) {
      Ti.API.info(data);
      if(data.meta) {
        var meta = data.meta;
        if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'loginUser') {
         _callback && _callback();
        }
      }
    }
  });
	
};

Users.showCurrent = function(_callback){
	/*Cloud.Users.showMe(function (e) {
      if (e.success) {
        var user = e.users[0];
        Ti.API.log(user);
        return user;
      } else {
        Ti.API.error('Error:\\n' +
            ((e.error && e.message) || JSON.stringify(e)));
      }
    });
    */
   var sdk = new Cocoafish('1iHEqePuYFs3SFXcaVwNIB4nAx3G99Ld','GxvXXCNnjESPojJkCXvGBGdjOJD5kc8k');  // app key
   sdk.sendRequest('users/show/me.json', 'GET', null, function(){
    if(data) {
      Ti.API.info(data);
      if(data.meta) {
        var meta = data.meta;
        if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'loginUser') {
         var user = data.response.users[0];
         _callback(user);
        }
      }
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
  var sdk = new Cocoafish('1iHEqePuYFs3SFXcaVwNIB4nAx3G99Ld','GxvXXCNnjESPojJkCXvGBGdjOJD5kc8k');  // app key
  var query = {
    where: Util.createSet([_club])
  };
  sdk.sendRequest('users/query.json', 'GET', query, function(data){
  	
    if(data) {
      if(data.meta) {
        var meta = data.meta;
        if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'queryUsers') {
          
          var users = data.response.users;
          Ti.API.log('get users from club query success ',users);
          
          _callback(users);
        }
      }
    }  	
  });
};
