var da1 = "https://raw.githubusercontent.com/adiazsoriano/Spain_Data/main/spa_case_data.csv";
var da2 = "https://raw.githubusercontent.com/adiazsoriano/Spain_Data/main/spa_vacc_data.csv";
var da3 = "https://raw.githubusercontent.com/adiazsoriano/Spain_Data/main/amzn_close_data.csv";
	
Plotly.d3.csv(da1, function(err, rows){
  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }
  
  var t1 = {
    type: "scatter",
    mode: "lines",
    name: 'COVID cases',
    x: unpack(rows,'date'),
    y: unpack(rows,'case'),
    line: {color: '#21A216'}
  }
 
  var data = [t1];
  var layout = {
    title: {
      text : 'Covid-19 Cases in Spain'
    },
    xaxis: {
      title : {
       text : 'Dates' 
      }
    } ,
    yaxis : {
      title : {
        text : 'Cases'
      }
    }
  };    
  Plotly.newPlot('chart1', data, layout);
})
  Plotly.d3.csv(da2, function(err, rows){
    function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; });
    }
    
    var t2 = {
      type: "scatter",
      mode: "lines",
      name: 'COVID vacc',
      x: unpack(rows,'date'),
      y: unpack(rows,'vac'),
      line: {color: '#21A216'}
    }
   
    var data = [t2];
    var layout = {
      title: {
        text : 'Covid-19 Vaccination In Spain'
      },
      xaxis: {
        title : {
         text : 'Dates' 
        }
      } ,
      yaxis : {
        title : {
          text : 'Vaccinations'
        }
      }
    };    
    Plotly.newPlot('chart2', data, layout);
  })
  Plotly.d3.csv(da3, function(err, rows){
    function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; });
    }
    
    var t3 = {
      type: "scatter",
      mode: "lines",
      name: 'AMZN CLose',
      x: unpack(rows, 'date'),
      y: unpack(rows, 'close'),
      line: {color: '#21A216'}
    }
   
    var data = [t3];
    var layout = {
      title: {
        text : 'Amazon Close Data'
      },
      xaxis: {
        title : {
         text : 'Dates' 
        }
      } ,
      yaxis : {
        title : {
          text : 'Close Price'
        }
      }
    };    
    Plotly.newPlot('chart3', data, layout);
  })