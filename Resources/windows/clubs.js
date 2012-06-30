Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/clubs_data.js');
(function (window) {
  var table, SELECTED, UNSELECTED, search, searchField, lastSearched, selectedClubs, deleteButton;

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
 
  var tblSearch = Titanium.UI.createSearchBar({
        height: 0,
        visible: false
  });
  
  searchField.addEventListener('return', function (e) {
  	tblSearch.value = e.value;
  	searchField.blur();
    //search();
  });
  
  searchField.addEventListener('change', function (e) {
  	Ti.API.log(e);
  	tblSearch.value = e.value;
  });
  searchField.addEventListener('cancel', function () {
    searchField.value = "";
    //search();
  });
  
  search = function () {
    searchField.blur();
    lastSearched = searchField.value;
    // use lastSearched
    //TODO: SEARCHING
  };

  table = Util.createSimpleDataTable(clubsData, {
    'table': { },
    'row': {
    	height: 40,
      process: function (club, object) {
        object.updateLayout(club in selectedClubs ? SELECTED : UNSELECTED);
      }
    }
  });
  
  table.search=tblSearch;

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
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);