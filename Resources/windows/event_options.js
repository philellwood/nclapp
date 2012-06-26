Ti.include('/data.js');

(function (window) {
  var cancel, save, options, ID;
  
  ID = "EVENT_OPTIONS";
  
  window.updateLayout({
    title: 'Events Options',
    backgroundColor: '#fff',
    barColor: '#000'
  });
  
  cancel = (window.leftNavButton = Ti.UI.createButton({
    title: "Cancel"
  }));
  cancel.addEventListener('click', function () {
    window.close();
  });
  
  save = (window.rightNavButton = Ti.UI.createButton({
    title: 'Save'
  }));
  save.addEventListener('click', function () {
    Data.save(ID, options);
    window.onchange && window.onchange();
    window.close();
  });
  
  options = Data.load(ID, {});
  
  
  
  
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);