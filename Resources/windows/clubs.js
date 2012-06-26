Ti.include('/util.js');
Ti.include('/data.js');
Ti.include('/clubs_data.js');
(function (window) {
  var table, SELECTED, UNSELECTED, selectedClubs, deleteButton;

  SELECTED = { backgroundColor: '#456', color: '#fff', isSelected: true };
  UNSELECTED = { backgroundColor: '#fff', color: '#000', isSelected: false };
  selectedClubs = Data.getUserClubs();

  table = Util.createSimpleDataTable(clubsData, {
    'table': {
      //style: Ti.UI.iPhone.TableViewStyle.GROUPED
    },
    'row': {
    	height: 40,
      process: function (club, object) {
        object.updateLayout(club in selectedClubs ? SELECTED : UNSELECTED);
      }
    }
  });

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
     title: 'Unsubscribe from all Clubs',
     top: 30,
     width: 300,
     height: 50,
     systemButton: Ti.UI.iPhone.SystemButton.TRASH
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

  window.add(deleteButton);

  window.add(table);
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);