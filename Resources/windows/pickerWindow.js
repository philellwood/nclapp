Ti.include('/util.js');
(function (window) {
  var backdrop, view, scrollingDescription, description, picker;
  window.updateLayout({
    backgroundColor: 'transparent',
    title: 'View Event'
  });
  window.add(backdrop = Ti.UI.createView({
    backgroundColor: '#def',
    opacity: 0.8,
    zIndex: 0
  }));
  
  window.add(view = Ti.UI.createView({
    top: 43, right: 0, bottom: 50, left: 0,
    backgroundColor: '#fff',
    zIndex: 1,
    layout: 'vertical'
  }));
  
  
  
  window.addEventListener('data', function (event) {
    var data = event.data;
    view.add(picker = Ti.UI.createPicker({
  	  type:data.type,
  	  minDate: data.minDate,
  	  value: data.value,
    }), {
      left: 10, top: 5, right: 10, height: 275
    });
    view.add(close = Ti.UI.createButton({
      title: 'Close', top: 10
    }));
    close.addEventListener('click', function () {
      window.close();
    });
  });
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);

