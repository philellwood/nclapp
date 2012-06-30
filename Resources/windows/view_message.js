Ti.include('/util.js');
(function (window) {
  
  window.updateLayout({
    backgroundColor: '#fff',
    barColor: Util.theme.mainColor,
    title: 'View Message'
  });
  
  window.addEventListener('data', function (msg) {
    var data = msg.data;
    Ti.API.log(data);
    window.add(Util.createDataView([
      { title: "Subject:", value: data.subject,    labelWidth: 100, height: 30  },
      { title: "Body:",    value: data.body,       labelWidth: 100, height: 100 },
      { title: "Sent:",    value: data.created_at, labelWidth: 100, height: 30  },
    ], {
      left: 10, top: 5, right: 10, height: 275
    }));
  });
}).call(Ti.UI.currentWindow, Ti.UI.currentWindow);
