var Users, Data;

if (!Users) {
  Users = {};
  
  if (!Data) Ti.include('data.js');
  Ti.include('cocoafish.js');
  var Cloud = require('ti.cloud');
  Cloud.debug = true;

  Users.create = function (_data, _success, _error) {
    var sdk = new Cocoafish('1iHEqePuYFs3SFXcaVwNIB4nAx3G99Ld','GxvXXCNnjESPojJkCXvGBGdjOJD5kc8k');
    Ti.API.log("create");
    sdk.sendRequest('users/create.json', 'POST', {
      username: _data.username,
      password: _data.password,
      password_confirmation: _data.confirmPassword,
    }, function(data){
      Ti.API.log(data);
      if(data) {
        if(data.meta) {
          var meta = data.meta;
          if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'createUser') {
            _success;
          }
        }
      }else{
      	error;
      }
    });
    
    
  };

  Users.login = function (_data, _success, _error) {
    var sdk = new Cocoafish('1iHEqePuYFs3SFXcaVwNIB4nAx3G99Ld','GxvXXCNnjESPojJkCXvGBGdjOJD5kc8k');  // app key
    var postData = {
      login: _data.login, 
      password: _data.password
    };
    sdk.sendRequest('users/login.json', 'POST', postData, function (data) {
      if(data && data.meta) {
        var meta = data.meta;
        if (meta.status == 'ok' && meta.code == 200 && meta.method_name == 'loginUser') {
          _success && _success();
          return;
        }
      }
      _error && _error();
    });
  };

  Users.showCurrent = function(_callback){
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
      where: JSON.stringify(Util.createSet([_club]))
    };
    Ti.API.log(query);
    sdk.sendRequest('users/query.json', 'GET', query, function(data){
  	
      if(data) {
      	Ti.API.log(data);
        if(data.meta) {
          var meta = data.meta;
          if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'queryUsers') {
          
            var users = data.response.users;
            Ti.API.log('get users from club query success ',users);
          
            _callback(users);
          }
        }  	
      };
    });
  };
  
  Users.logout = function(_callback){
    var sdk = new Cocoafish('1iHEqePuYFs3SFXcaVwNIB4nAx3G99Ld','GxvXXCNnjESPojJkCXvGBGdjOJD5kc8k');  // app key
    Ti.API.log('logout');
    sdk.sendRequest('users/logout.json', 'GET', null, function(data){
      if(data) {	
        if(data.meta) {
          var meta = data.meta;
          if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'logoutUser') {
          	Ti.API.log('logout success');
            _callback && _callback();
          }
        }
      }   	
    });  	
  };
}
