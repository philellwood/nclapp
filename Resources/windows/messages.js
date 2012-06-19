Ti.include('/data.js');

Ti.UI.currentWindow.add(Ti.UI.createLabel({
  text: 'Hello, world.',
  top: 30,
  height: 'auto',
  width: 'auto'
}));

var deleteButton = Ti.UI.createButton({
   title: 'Unsubscribe from all Clubs',
   top: 10,
   width: 300,
   height: 50
});

deleteButton.addEventListener('click',function(e)
{
	Data.removeAllClubs();
	Titanium.API.info("Deleted clubs");
});

Ti.UI.currentWindow.add(deleteButton);