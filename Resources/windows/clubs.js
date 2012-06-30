Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/clubs_data.js');
(function (window) {
  var table, allClubs, tableClubs, SELECTED, UNSELECTED, search, searchField, lastSearched, selectedClubs, deleteButton;

  var allClubs = clubsData;
  var tableClubs = allClubs.slice();
  
  SELECTED = {
    backgroundColor: Util.theme.darkColor, color: '#fff', isSelected: true, rightImage: '/images/117-todo.png'
  };
  UNSELECTED = {
    backgroundColor: '#fff', color: '#000', isSelected: false, rightImage: ''
  };
  selectedClubs = Data.getUserClubs();
  
  lastSearched = "";
  searchField = (window.titleControl = Ti.UI.createSearchBar({
    barColor: Util.theme.mainColor, 
    height: 44,
    width: 'auto',
    showCancel: true,
    value: lastSearched
  }));
  searchField.setAutocapitalization(0);
  searchField.setAutocorrect(false);
  
  searchField.addEventListener('return', function () {
    search();
  });
  searchField.addEventListener('cancel', function () {
    searchField.value = "";
    search();
  });
  
  search = function () {
    var searchReg;
    searchField.blur();
    lastSearched = searchField.value;
    if (lastSearched === "") {
      //  Fresh copy of allClubs
      tableClubs = allClubs.slice();
    } else {
      //  Build searching expression
      searchReg = new RegExp(lastSearched);
      //  Sort the table by the expression
      tableClubs.sort(function (a, b) { return b.search(searchReg) - a.search(searchReg); });
    }
    //  Refresh the table
    refreshTable();
  };
  
  refreshTable = function () {
    table.data = Util.foreach(tableClubs, function (index, club) {
      var row = Ti.UI.createTableViewRow({
        height: 40, title: club
      });
      row.updateLayout(club in selectedClubs ? SELECTED : UNSELECTED);
      return row;
    });
  };

  table = Ti.UI.createTableView();

  table.addEventListener('click', function (e) {
    Ti.API.log(e);
    Ti.API.log(e.rowData.title);
    var title = e.rowData.title;
    if (title in Data.getUserClubs()){
    	e.rowData.updateLayout(UNSELECTED);
    	Ti.API.log("in selected");
    	Data.unsubscribeToClub(e.rowData.title);
    	Ti.API.log(Data.getUserClubs());
    } else {
    	e.rowData.updateLayout(SELECTED);
    	Ti.API.log("not in selected");
    	Data.subscribeToClub(e.rowData.title);
    	Ti.API.log(Data.getUserClubs());
    }
  });

  deleteButton = (window.rightNavButton = Ti.UI.createButton({
     title: 'Delete All'
  }));
  deleteButton.addEventListener('click', function (e) {
    var dialog = Ti.UI.createAlertDialog({
      title: 'Unsubscribe', message: 'Unsubscribe from all clubs?', buttonNames: ['No', 'Yes'], cancel: 0
    });
    dialog.addEventListener('click', function (e) {
      if (e.cancel === e.index || e.cancel === true) {
        return;
      }
      if (e.index === 1) {
        Data.removeAllClubs();
        //Titanium.API.info("Unsubscribed from all clubs.");
        // TODO: update layout for all selected rows
        Util.foreach(table.data[0].rows, function (_, row) {
          Ti.API.info(row);
        	if (row.isSelected) {
        	  row.updateLayout(UNSELECTED);
      	  }
        });
      }
    });
    dialog.show();
  });

  window.add(table);
  refreshTable();
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);