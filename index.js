/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root and chart
var root = am5.Root.new("chartdiv"); 

// Set themes
root.setThemes([
  am5themes_Animated.new(root)
]);



var dataProvider;      
loadCSV("data/data.csv"); 

// method which loads external data
function loadCSV(file) { 
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari
        var request = new XMLHttpRequest();
    }
    else {
        // code for IE6, IE5
        var request = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // load
    
    request.open('GET', file, false);
    request.send();
    parseCSV(request.responseText);
}

// method which parses csv data
function parseCSV(data){ 
  //replace UNIX new lines
  data = data.replace (/\r\n/g, "\n");
  //replace MAC new lines
  data = data.replace (/\r/g, "\n");
  //split into rows
  var rows = data.split("\n");
  // create array which will hold our data:
  dataProvider = [];

  // loop through all rows
  for (var i = 0; i < rows.length; i++){
      // this line helps to skip empty rows
      if (rows[i]) {                    
          // our columns are separated by comma
          var column = rows[i].split(",");  

          // column is array now 
          // first item is date
          var country = column[0];
          // second item is value of the second column../
          var gender = column[1];
          var sampleSize = column[2];
          var question = column[3];
          var response = column[4];
          var percentage = column[5];
          // third item is value of the fird column 


          // create object which contains all these items:
          var dataObject = {country:country, gender:gender, sampleSize:sampleSize, question:question, response:response, percentage:percentage};
          // add object to dataProvider array
          dataProvider.push(dataObject);
      }
  }
  // set data provider to the chart
  //chart.dataProvider = dataProvider;
  // this will force chart to rebuild using new data            
  //chart.validateData();
}
// ====================================
// Create map
// ====================================

var map = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "none",
    projection: am5map.geoNaturalEarth1()
  })
);

// Create polygon series
var polygonSeries = map.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_continentsLow,
    exclude: ["antarctica"],
    fill: am5.color(0xbbbbbb)
  })
);

var pointSeries = map.series.push(
  am5map.MapPointSeries.new(root, {
    // ...
  })
);

pointSeries.bullets.push(function(root, series, x) {
  
  var chartData = x.dataContext.data;
  
  var chart = root.container.children.push(am5percent.PieChart.new(root, {
    width: chartData.width,
    height: chartData.height,
    radius: am5.p100,
    centerX: am5.p50,
    centerY: am5.p50
  }));
  
  var series = chart.series.push(am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category"
  }));
  
  series.labels.template.set("forceHidden", true);
  series.ticks.template.set("forceHidden", true);
  series.data.setAll(chartData.pieData);
 
  return am5.Bullet.new(root, {
    sprite: chart
  });
});

pointSeries.bullets.push(function(root, series, x) {
  
  var chartData = x.dataContext.data;
 
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: chartData.title,
      centerX: am5.p50,
      centerY: am5.p100,
      dy: chartData.height * -0.5
    })
  });
});


// ====================================
// Create pie charts
// ====================================

var charts = [{
  "title": "Argentina",
  "latitude": -38.416097,
  "longitude": -63.616672,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 600
  }, {
    "category": "Category #3",
    "value": 350
  }]
}, {
  "title": "Australia",
  "latitude": -25.274398,
  "longitude": 133.775136,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 600
  }, {
    "category": "Category #3",
    "value": 350
  }]
}, {
  "title": "Canada",
  "latitude": 56.130366,
  "longitude": -106.346771,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 600
  }, {
    "category": "Category #3",
    "value": 350
  }]
}, {
  "title": "China",
  "latitude": 	35.86166,
  "longitude": 	104.195397,
  "width": 80,
  "height": 80,
  "pieData": [{
    "category": "Category #1",
    "value": 352
  }, {
    "category": "Category #2",
    "value": 266
  }, {
    "category": "Category #3",
    "value": 512
  }, {
    "category": "Category #4",
    "value": 199
  }]
}, {
  "title": "Colombia",
  "latitude": 	4.570868,
  "longitude": -74.297333,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 300
  }, {
    "category": "Category #3",
    "value": 599
  }, {
    "category": "Category #4",
    "value": 512
  }]
}, {
  "title": "France",
  "latitude": 46.227638,
  "longitude": 	2.213749,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 600
  }, {
    "category": "Category #3",
    "value": 350
  }]
}, {
  "title": "Germany",
  "latitude": 51.165691,
  "longitude": 10.451526,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 600
  }, {
    "category": "Category #3",
    "value": 350
  }]
}, {
  "title": "Great Britain",
  "latitude": 55.378051,
  "longitude": -3.435973,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 600
  }, {
    "category": "Category #3",
    "value": 350
  }]
}, {
  "title": "Japan",
  "latitude": 		36.204824,
  "longitude": 		138.252924,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 600
  }, {
    "category": "Category #3",
    "value": 350
  }]
}, {
  "title": "Kenya",
  "latitude": 	-0.023559,
  "longitude": 	37.906193,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 600
  }, {
    "category": "Category #3",
    "value": 350
  }]
}, {
  "title": "Mexico",
  "latitude": 	23.634501,
  "longitude": 	-102.552784,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 600
  }, {
    "category": "Category #3",
    "value": 350
  }]
}, {
  "title": "New Zealand",
  "latitude": 	-40.900557,
  "longitude": 	174.885971,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 600
  }, {
    "category": "Category #3",
    "value": 350
  }]
}, {
  "title": "South Africa",
  "latitude": 		-30.559482,
  "longitude": 		22.937506,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 600
  }, {
    "category": "Category #3",
    "value": 350
  }]
}, {
  "title": "Switzerland",
  "latitude": 		46.818188,
  "longitude": 		8.227512,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 600
  }, {
    "category": "Category #3",
    "value": 350
  }]
}, {
  "title": "United States",
  "latitude": 37.09024,
  "longitude": -95.712891,
  "width": 50,
  "height": 50,
  "pieData": [{
    "category": "Category #1",
    "value": 200
  }, {
    "category": "Category #2",
    "value": 600
  }, {
    "category": "Category #3",
    "value": 350
  }]
}];

var selected = ["Argentina", "Tunisia", "United States", "Switzerland", "France", "New Zealand", "South Africa", "Kenya", "Japan", "China"];

for (var i = 0; i < charts.length; i++) {
  var chart = charts[i];
  if (selected.includes(chart.title)){
    console.log(chart.title);
    pointSeries.data.push({
      geometry: { type: "Point", coordinates: [chart.longitude, chart.latitude] },
      title: chart.title,
      data: chart
    });
  }
  
}