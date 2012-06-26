
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
      'backgroundColor': '#fff',
      'barColor': '#123'
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

Util.createDataView = function (data, props) {
  var view;
  view = Ti.UI.createScrollView(Util.merge(props, {
    layout: 'vertical',
    contentHeight: 'auto'
  }));
  Util.foreach(data, function (_, item) {
    view.add(Util.createDataViewRow(item));
  });
  return view;
};
Util.createDataViewRow = function (item) {
  var view;
  view = Ti.UI.createView({
    layout: 'horizonal',
    height: item.height + 5 || 'auto',
    left: 0, right: 0
  });
  if (!item.type || item.type === 'text') {
    view.add(Ti.UI.createLabel({
      text: item.title,
      width: item.labelWidth || 100,
      left: 0,
      top: 5
    }))
    view.add(Ti.UI.createTextArea({
      value: item.value,
      editable: false,
      borderWidth: 1,
      borderColor: '#bbb',
      borderRadius: 1,
      top: 5,
      bottom: 0,
      left: item.labelWidth || 100,
      right: 0
    }));
  }
  return view;
};

Util.empty = function () {};
Util.identity = function () {};
Util.constant = function (x) { return function (y) { return x; } };

Util.typeOf = function (data) {
  return Object.prototype.toString.call(data).slice(8, -1);
};
Util.typeIs = function (data, type) {
  return Util.typeOf(data).toLowerCase() === type.toLowerCase();
};
Util.isFunction = function (data) {
  return Util.typeIs(data, 'Function');
};
Util.isObject = function (data) {
  return Util.typeIs(data, 'Object');
};
Util.isArray = function (data) {
  return Util.typeIs(data, 'Array');
};
Util.isEmptyObject = function (obj) {
  return (Util.keys(obj).length === 0);
};

Util.arrayOf = function (data) {
  if (data === undefined) return [];
  return Util.isArray(data) ? data : [data];
};

Util.merge = function () {
  var index, len, result, item, key;
  result = {};
  Util.foreach(arguments, function (index, item) {
    Util.forin(item, function (key, value) {
      result[key] = value;
    });
  });
  return result;
};
Util.foreach = function (arr, delegate, that) {
  var index, len, result = [];
  if (arr && 'length' in arr && Util.isFunction(delegate)) {
    for (index = 0, len = arr.length; index < len; index += 1) {
      result.push(delegate.call(that, index, arr[index], arr, len));
    }
  } else {
    throw new Error("Invalid array or function supplied to foreach loop.");
  }
  return result;
};
Util.forin = function (obj, delegate, that) {
  var key, result = {};
  if (Util.isObject(obj) && Util.isFunction(delegate)) {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = delegate.call(that, key, obj[key], obj);
      }
    }
  } else {
    throw new Error("Invalid object or function supplied to forin loop.");
  }
  return result;
};
Util.loopUntil = function (arr, delegate, that) {
  var index, len;
  if (arr && 'length' in arr && Util.isFunction(delegate)) {
    for (index = 0, len = arr.length; index < len; index += 1) {
      if (true === delegate.call(that, index, arr[index], arr, len)) {
        return;
      }
    }
  } else {
    throw new Error("Invalid array or function supplied to foreach loop.");
  }
};

Util.concat = function (_a, _b) {
  var a, b;
  a = Util.arrayOf(_a);
  b = Util.arrayOf(_b);
  return a.concat(b);
};

Util.keys = function (obj) {
  var keys = [];
  Util.forin(obj, function (key) {
    keys.push(key);
  });
  // Ti.API.log(obj);
  return keys;
};

Util.createSet = function (seq) {
  var set = {};
  if (Util.isArray(seq)) {
    Util.foreach(seq, function (_, key) {
      set[key] = key;
    });
  } else if (Util.isObject(seq)) {
    Util.forin(seq, function (key) {
      set[key] = key;
    });
  } else {
    throw new Error("Couldn't create set from non-array or non-object.");
  }
};

Util.dataStored = function (id) {
  return Ti.App.Properties.hasProperty(id);
};
Util.dataNotStored = function (id) {
  return !Util.dataStored(id);
};
Util.loadData = function (id) {
  return JSON.parse(Ti.App.Properties.getString(id));
};
Util.saveData = function (id, obj) {
  if (Util.isFunction(obj)) {
    throw new Error("Cannot save function data.");
  } else {
    Ti.App.Properties.setString(id, JSON.stringify(obj));
  }
};

Util.onEvent = function (event, delegate) {
  return Ti.App.addEventListener(event, delegate);
};
Util.fireEvent = function (event, data) {
  return Ti.App.fireEvent(event, data);
};
