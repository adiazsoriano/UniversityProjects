var da1 = "https://raw.githubusercontent.com/adiazsoriano/CovidData/main/vadata.csv";

Plotly.d3.csv(da1, function(err, rows){
    function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; });
    }
    
    var t1 = {
      type: "scatter",
      mode: "lines",
      name: 'COVID Cases',
      x: unpack(rows,'Date'),
      y: unpack(rows,'VADATA.Total'),
      line: {color: '#21A216'}
    }

    var t2 = {
      type: "scatter",
      mode: "lines",
      name: 'COVID Deaths Confirmed',
      x: unpack(rows,'Date'),
      y: unpack(rows,'VADATA.DeathConfirmed'),
      line: {color: '#FFA216'}
    }
   
    var data = [t1,t2];
    var layout = {
      title: {
        text : 'Covid-19 Cases and Total Deaths in Virginia'
      },
      xaxis: {
        title : {
         text : 'Dates' 
        }
      } ,
      yaxis : {
        title : {
          text : 'Number of:'
        }
      }
    };    
    Plotly.newPlot('chart', data, layout);
  })