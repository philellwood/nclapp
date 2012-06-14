Ti.include('/util.js');
Ti.include('/society_data.js');

var table;

table = Util.createSimpleDataTable(societyData, {
  'table': {
    style: Ti.UI.iPhone.TableViewStyle.GROUPED
  },
  'row': { }
});

table.addEventListener('click', function (e) {
  e.rowData.backgroundColor = '#0f0';
  Util.subscribeToClub(e.rowData.title);
});

Ti.UI.currentWindow.add(table);
