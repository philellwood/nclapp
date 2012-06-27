Ti.include('cocoafish.js');
var Events = {};
/*
 *  <property name="acs-oauth-secret-development" type="string">GxvXXCNnjESPojJkCXvGBGdjOJD5kc8k</property>
 *  <property name="acs-oauth-key-development" type="string">1iHEqePuYFs3SFXcaVwNIB4nAx3G99Ld</property>
 *  <property name="acs-api-key-development" type="string">1PlafvOb0KsfJhWw68tWkGiVt3IkhjxR</property>
 */
 
var sdk = new Cocoafish('1PlafvOb0KsfJhWw68tWkGiVt3IkhjxR');
Events.create = function (_data, _callback, _error) {
  var custom_field = { club: _data.club };
  _data.custom_fields = JSON.stringify(custom_field);
  sdk.sendRequest('events/create.json', 'POST', _data, function (data) {
    if (data && data.meta) {
      var meta = data.meta;
      if (meta.status === 'ok' && meta.code === 200 && meta.method_name === 'createEvent') {
    	  Ti.API.log(data.response);
    	  _callback && _callback(data.response);
    	  return;
      }
    }
    _error && _error(data);
  });
};

Events.queryClub = function(query,_callback){
  var whereString = JSON.stringify(query);
  var query = {
    where: whereString
  };
  Ti.API.log(query);
  sdk.sendRequest('events/query.json', 'GET', query, function(data){
    if(data) {
      if(data.meta) {
        var meta = data.meta;
        if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'queryEvents') {
          var events = data.response.events;
          Ti.API.log(events);
          _callback(events);
        }
      }
    }  	
  });	
  
};

Events.deleteEvent = function(_id){
  var postData = {event_id : _id};
  sdk.sendRequest('events/delete.json', 'DELETE', postData, function(data){
    if(data) {
      if(data.meta) {
        var meta = data.meta;
        if(meta.status == 'ok' && meta.code == 200 && meta.method_name == 'createEvent') {
      	  Ti.API.log(data.response);
        }
      }
    }
  });	
}

