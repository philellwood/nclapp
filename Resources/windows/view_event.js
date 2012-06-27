Ti.include('/util.js');
(function (window) {
  
  window.updateLayout({
    backgroundColor: '#fff',
    barColor: Util.theme.mainColor,
    title: 'View Event'
  });
  
  window.addEventListener('data', function (event) {
    var data = event.data;
    window.add(Util.createDataView([
      { title: "Name:",    value: data.name,               labelWidth: 100, height: 30  },
      { title: "Club:",    value: data.custom_fields.club, labelWidth: 100, height: 30  },
      { title: "Details:", value: data.details,            labelWidth: 100, height: 100 },
      { title: "Start:",   value: data.start_time,         labelWidth: 100, height: 30  }
    ], {
      left: 10, top: 5, right: 10, height: 275
    }));
  });
  
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);
