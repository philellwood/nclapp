var Util = {};

Util.createSimpleDataTable = function (input, properties) {
  var rows, row, i, len, tableProps, rowProps, process;
  
  rows = [];
  tableProps = (properties && properties.table) || {};
  rowProps = (properties && properties.row) || {};
  process = (rowProps && rowProps.process) || function(){};
  
  for (i = 0, len = input.length; i < len; i += 1) {
    row = Ti.UI.createTableViewRow(Util.merge(rowProps, { 'title': input[i] }));
    process(input[i], row);
    rows.push(row);
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
