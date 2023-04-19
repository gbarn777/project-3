console.log("data")

// Fetch data from the API endpoint
fetch('/api/directors')
.then(response => response.json())
.then(data => {
  console.log(data)
  // Extract data for the chart
  const labels = data.map(movie => movie.title);
  const directors = data.map(movie => movie.director);
  const revenues = data.map(movie => movie.revenue);
  const release_date = data.map(movie => movie.release_date)

  // Create a data object for the chart
  const chartData = {
    labels: directors,
    datasets: [{
      label: 'Movies',
      data: revenues,
      backgroundColor: 'rgba(75, 192, 192, 0.5)', // Set bubble background color
      borderColor: 'rgba(75, 192, 192, 1)', // Set bubble border color
      borderWidth: 1, // Set bubble border width
      hoverRadius: 10, // Set hover radius for bubbles
      hoverBorderWidth: 2 // Set hover border width for bubbles
    }]
  };

  // Create a chart using Chart.js
  function optionYear(release_date) {
    console.log("release_date=", release_date);
    let year = data.release_date;
    let resultArray = year.filter( yearObj => yearObj.release_date == sample);
    let result = resultArray[0];
    let director = result.directors;

  new Chart(document.getElementById('bubbleChart'), {
    type: 'bar',
    data: {
      labels: directors,
      datasets: [{
        label: 'Movies',
        data: data.map(movie => ({
          x: movie.director,
          y: movie.revenue,
          r: 10 // Set bubble radius
        })),

        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Set bubble background color
        borderColor: 'rgba(75, 192, 192, 1)', // Set bubble border color
        borderWidth: 1, // Set bubble border width
        hoverRadius: 10, // Set hover radius for bubbles
        hoverBorderWidth: 2 // Set hover border width for bubbles
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Director' // Set x-axis label
          }
        },
        y: {
          title: {
            display: true,
            text: 'Revenue' // Set y-axis label
          }
        }
      }
    }
  });
}})
.catch(error => console.error('Error fetching data:', error));

console.log("movies-bubblechart.js")

var yearTag = d3.select('#selYear');

// Add dropdown menu
fetch('/api/movies')
  .then(response => response.json())
  .then(
    data => {
      console.log("data")
      console.log(data)

      var year_array = []

      for (var i = 0; i < data.length; i++) {
        date = data[i].release_date
        year = 2000 + parseInt(date.split("/")[2])

        if (year_array.indexOf(year) === -1) {
          year_array.push(year)
        }
      }

      // console.log("year_array")
      // console.log(year_array)

      yearTag
        .append("option")
        .property("value", "")
        .text("Select Year");

      year_array.map((year) => {
        yearTag
          .append("option")
          .property("value", year)
          .text(year);
      });

    })

const tbody = d3.select("tbody");
