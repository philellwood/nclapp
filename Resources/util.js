var Util = {};

Util.getUserClubs = function(){
	if (Ti.App.Properties.hasProperty('clubs')){
		return Ti.App.Properties.getList('clubs');
	}
	
};

Util.subscribeToClub = function(clubName){
	var currentClubs;
	
	if (Ti.App.Properties.hasProperty('clubs')){
		currentClubs = Ti.App.Properties.getList('clubs');
	}
	
	currentClubs.push(clubName);
	
	Ti.App.Properties.setList('clubs', currentClubs);
};
Util.createSimpleDataTable = function (input, properties) {
  var rows, i, len, tableProps, rowProps;
  
  rows = [];
  tableProps = (properties && properties.table) || {};
  rowProps = (properties && properties.row) || {};
  
  for (i = 0, len = input.length; i < len; i += 1) {
    rows.push(Util.merge(rowProps, { 'title': input[i] }));
  }
  
  return Ti.UI.createTableView(Util.merge(tableProps, {'data': rows}));
};

Util.buildTabGroup = function (data) {
  var index, length, datum, tabs, window;
  
  tabs = [];
  for (index = 0, length = data.length;
       index < length;
       index += 1) {
    datum = data[index];
    
    window = Ti.UI.createWindow({
      'title': datum.title || 'No title',
      'url': datum.url || '',
      'backgroundColor': '#fff'
    });
    
    tabs.push(Ti.UI.createTab({
      'title': datum.title,
      'icon': datum.icon,
      'window': window
    }));
  }
  
  return Ti.UI.createTabGroup({
    'tabs': tabs
  });
};

Util.merge = function () {
  var i, len, obj, k, result;
  result = {};
  for (i = 0, len = arguments.length; i < len; i += 1) {
    obj = arguments[i];
    if (obj) {
      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          result[k] = obj[k];
        }
      }
    }
  }
  return result;
};
