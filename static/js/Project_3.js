const url = "http://localhost:5000/api/movies"
// Promise Pending
function init() {
    let scatterdata = [{
        type: "scatter", mode: "markers"
      }];
      let scatterlayout= {xaxis:{title:"Budget, $"}, yaxis:{title:"Box Office Revenue, $"}}
     
          Plotly.newPlot("scatter",scatterdata,scatterlayout);
  }
  init();
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);
// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
  let years=["--",2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022]
d3.select("#selDataset").selectAll("myoptions").data (years)
.enter().append("option").text(function (d){return d;}).attr("value",function (d){return d;})
d3.selectAll("#selDataset").on("change", updatePlotly);
    // This function is called when a dropdown menu item is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let year = dropdownMenu.property("value");
          // Initialize x and y arrays
    let x = [];
    let y = [];
    let text=[];
       for (let i=0;i <data.length;i++){
      if (parseInt (new Date(data[i]["release_date"]).getFullYear())==year){
      x.push(data[i]["budget"]);
      y.push(data[i]["revenue"])
    text.push("title: "+ data[i]["title"]+ "<br>" +"director: " + data[i]["director"] +"<br>"+"rating: " + data[i]["rating"])}
      
    }
    
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("scatter", "x", [x]);
    Plotly.restyle("scatter", "y", [y]);
    Plotly.restyle("scatter", "text", [text]);
  
  }
   });
  
  
