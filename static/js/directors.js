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
      data: data.map(movie => ({
        x: movie.title,
        y: movie.revenue,
        r: 10 // Set bubble radius
      })),

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
    data: chartData,
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Movie Title' // Set x-axis label
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

console.log("directors.js")

var yearTag = d3.select('#selYear');

// Add dropdown menu
// Fetch data from the API and create the chart
        fetch('/api/directors')
          .then(response => response.json())
          .then(data => {
            createChart(data);
            // Add an event listener to update the chart when the language selection changes
            const directorSelector = document.getElementById('directorSelector');
            Selector.addEventListener('change', event => {
              updateChart(event.target.value);
            });
          })
          .catch(error => {
            console.error('Error fetching directors:', error);
          });