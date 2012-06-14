Ti.include('/util.js');
Ti.include('/clubs.js');

var table;

table = Util.createSimpleDataTable(clubs, {
  'table': { },
  'row': { }
});

table.addEventListener('click', function (e) {
  e.rowData.backgroundColor = '#0f0';
});

Ti.UI.currentWindow.add(table);
