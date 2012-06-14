var Util = {};

Util.createSimpleDataTable = function (input) {
  var tableData, i, len;
  tableData = [];
  for (i = 0, len = input.length; i < len; i += 1){
    tableData.push({title : input[i]});
  }
  return Ti.UI.createTableView({
    data: tableData
  });;
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
