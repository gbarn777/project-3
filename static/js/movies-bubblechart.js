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

  // Create a data object for the chart
  const chartData = {
    labels: labels,
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
  new Chart(document.getElementById('bubbleChart'), {
    type: 'bar',
    data: {
      labels: labels,
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
})
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

function optionYear(selected_yr) {
  console.log("selected_yr=", selected_yr);

  // Table view
  tbody.html("");

  const tbl_header = tbody.append("tr");
  let header = tbl_header.append("th");
  header.text("id");
  header = tbl_header.append("th");
  header.text("title");
  header = tbl_header.append("th");
  header.text("genre");
  header = tbl_header.append("th");
  header.text("language");
  header = tbl_header.append("th");
  header.text("release_date");
  header = tbl_header.append("th");
  header.text("budget");
  header = tbl_header.append("th");
  header.text("revenue");
  header = tbl_header.append("th");
  header.text("rating");
  header = tbl_header.append("th");
  header.text("vote_count");
  header = tbl_header.append("th");
  header.text("director");
  header = tbl_header.append("th");
  header.text("dir_gender");
  header = tbl_header.append("th");
  header.text("dir_popularity");

  fetch('/api/movies')
    .then(response => response.json())
    .then(
      data => {
        
        for (var i = 0; i < data.length; i++) {
          date = data[i].release_date
          year = 2000 + parseInt(date.split("/")[2])

          const tbl_data = tbody.append("tr");

          if (selected_yr == year) {
            // console.log("data[i]")
            // console.log(data[i])

            let cell = tbl_data.append("td");
            cell.text(data[i].id);
            cell = tbl_data.append("td");
            cell.text(data[i].title);
            cell = tbl_data.append("td");
            cell.text(data[i].genre);
            cell = tbl_data.append("td");
            cell.text(data[i].language);
            cell = tbl_data.append("td");
            cell.text(data[i].release_date);
            cell = tbl_data.append("td");
            cell.text(data[i].budget);
            cell = tbl_data.append("td");
            cell.text(data[i].revenue);
            cell = tbl_data.append("td");
            cell.text(data[i].rating);
            cell = tbl_data.append("td");
            cell.text(data[i].vote_count);
            cell = tbl_data.append("td");
            cell.text(data[i].director);
            cell = tbl_data.append("td");
            cell.text(data[i].dir_gender);
            cell = tbl_data.append("td");
            cell.text(data[i].dir_popularity);

          }
        }
      })
}

