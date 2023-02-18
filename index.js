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
var colors = am5.ColorSet.new(root, {});

// Set themes
root.setThemes([
  am5themes_Animated.new(root)
]);

// ====================================
// Getting data from CSV file
// ====================================

var chart;
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
}

// ====================================
// Create map
// ====================================

var map = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    projection: am5map.geoEquirectangular(),
    minZoomLevel: 1,
    maxZoomLevel: 5
  })
);

// Create polygon series
var polygonSeries = map.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"],
    fill: am5.color(0xaaaaaa),
    stroke: am5.color(0xffffff)
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  templateField: "polygonSettings"
});

var pointSeries = map.series.push(
  am5map.MapPointSeries.new(root, {
    // ...
  })
);

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: colors.getIndex(9)
});
//ICI
var big_series;
polygonSeries.mapPolygons.template.events.on("click", (ev) => {
  var dataItem = ev.target.dataItem;
  var data = dataItem.dataContext;
  selectedCountry = data.name;
  big_chartdata = []

  //   displaying detailed pie chart for country
  //--- Getting corresponding pie chart
  for(var i = 1; i < dataProvider.length; i++){
    if (dataProvider[i]["gender"] == "Total" && dataProvider[i]["country"] == selectedCountry){ //displaying total number
      big_chartdata.push({
        "title": dataProvider[i]["country"],
        "latitude": lats[dataProvider[i]["country"]],
        "longitude": longs[dataProvider[i]["country"]],
        "width": 90,
        "height": 90,
        "pieData": [{
          "category": "Answer #1",
          "value": dataProvider[i]["percentage"]
        }, {
          "category": "Answer #2",
          "value": dataProvider[i+1]["percentage"]
        }, {
          "category": "Answer #3",
          "value": dataProvider[i+2]["percentage"]
        }, {
          "category": "Answer #4",
          "value": dataProvider[i+3]["percentage"]
        }, {
          "category": "Answer #5",
          "value": dataProvider[i+4]["percentage"]
        }, {
          "category": "Answer #6",
          "value": dataProvider[i+5]["percentage"]
        }, {
          "category": "Answer #7",
          "value": dataProvider[i+6]["percentage"]
        }, {
          "category": "Answer #8",
          "value": dataProvider[i+7]["percentage"]
        }, {
          "category": "Answer #9",
          "value": dataProvider[i+8]["percentage"]
        }, {
          "category": "Answer #10",
          "value": dataProvider[i+9]["percentage"]
        }, {
          "category": "Answer #11",
          "value": dataProvider[i+10]["percentage"]
        }]
      })
      //hiding map and pie charts when the country is found
      polygonSeries.hide(100);
      pointSeries.hide(100);
      break;
    }
  }
  //--- Showing the pie chart
  var big_chart = root.container.children.push(
    am5percent.PieChart.new(root, {})
  );

  big_series = big_chart.series.push(
    am5percent.PieSeries.new(root, {
      categoryField: "category",
      valueField: "value"
    })
  );
  big_series.data.setAll(big_chartdata[0].pieData);
});

window.addEventListener('keydown', (event) => {
  big_series.hide();
  polygonSeries.show();
  pointSeries.show();
}, false);


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
// Create pie charts from CSV data
// ====================================

var charts = new Array();

var lats = {
  "Argentina": -38.416097, 
  "Australia" :-25.274398, 
  "Canada" : 56.130366, 
  "China" : 35.86166, 
  "Colombia": 4.570868, 
  "France" : 46.227638,       
  "Germany" : 51.165691, 
  "Great Britain" : 55.378051 , 
  "Japan": 36.204824, 
  "Kenya" : -0.023559, 
  "Mexico" : 23.634501, 
  "New Zealand" : -40.900557, 
  "South Africa" : -30.559482, 
  "Switzerland" : 46.818188, 
  "Tunisia" : 34.698345,
  "United States" :37.09024};

var longs= {
  "Argentina": -63.616672, 
  "Australia" : 133.775136, 
  "Canada" : -106.346771, 
  "China" : 104.195397, 
  "Colombia": -74.297333, 
  "France" : 2.21374, 
  "Germany" : 10.451526, 
  "Great Britain" : -3.435973, 
  "Japan": 138.252924, 
  "Kenya" : 37.906193, 
  "Mexico" : -102.552784, 
  "New Zealand" : 174.885971, 
  "South Africa" : 22.937506, 
  "Switzerland" : 8.227512, 
  "Tunisia" : 9.460581,
  "United States" :-95.712891};

for(var i = 1; i < dataProvider.length; i++){
  if (dataProvider[i]["gender"] == "Total"){ //displaying total number
    charts.push({
      "title": dataProvider[i]["country"],
      "latitude": lats[dataProvider[i]["country"]],
      "longitude": longs[dataProvider[i]["country"]],
      "width": 50,
      "height": 50,
      "pieData": [{
        "category": "Category #1",
        "value": dataProvider[i]["percentage"]
      }, {
        "category": "Category #2",
        "value": dataProvider[i+1]["percentage"]
      }, {
        "category": "Category #3",
        "value": dataProvider[i+2]["percentage"]
      }, {
        "category": "Category #4",
        "value": dataProvider[i+3]["percentage"]
      }, {
        "category": "Category #5",
        "value": dataProvider[i+4]["percentage"]
      }, {
        "category": "Category #6",
        "value": dataProvider[i+5]["percentage"]
      }, {
        "category": "Category #7",
        "value": dataProvider[i+6]["percentage"]
      }, {
        "category": "Category #8",
        "value": dataProvider[i+7]["percentage"]
      }, {
        "category": "Category #9",
        "value": dataProvider[i+8]["percentage"]
      }, {
        "category": "Category #10",
        "value": dataProvider[i+9]["percentage"]
      }, {
        "category": "Category #11",
        "value": dataProvider[i+10]["percentage"]
      }]
    })
    i=i+11;
  }
}

var selected = [ "Canada","Argentina", "Colombia", "Tunisia", "United States", "Switzerland", "France", "New Zealand", "South Africa", "Kenya", "Japan", "China"];

for (var i = 0; i < charts.length; i++) {
  var chart = charts[i];
  if (selected.includes(chart.title)){
    pointSeries.data.push({
      geometry: { type: "Point", coordinates: [chart.longitude, chart.latitude] },
      title: chart.title,
      data: chart
    });
  }
}