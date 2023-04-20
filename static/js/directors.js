let chartInstance;
let originalData;

function createChart(data) {
  // Save the original data for filtering
  originalData = data;
  // Process the API data to match the format required by Chart.js
  const chartData = {
    labels: data.map(item => item.title),
    datasets: [
      {
        label: 'Revenue',
        data: data.map(item => item.revenue),
        borderColor: 'rgb(219, 112, 147)', // pinkish color
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  // Get the canvas element and create a chart
  const canvas = document.getElementById('bubbleChart');
  const ctx = canvas.getContext('2d');
  // Destroy the previous chart instance if it exists
  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(ctx, {
    type: 'line', // Line chart
    data: chartData,
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Title',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Revenue',
          },
          beginAtZero: true,
        },
      },
      plugins: {
        tooltip: {
          mode: 'nearest',
          intersect: false,
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    },
  });
}

function updateChart(directors) {
  let filteredData = originalData;
  if (directors) {
    filteredData = originalData.filter(item => item.directors === directors);
  }
  // Destroy the previous chart instance if it exists
  if (chartInstance) {
    chartInstance.destroy();
  }
  // Create a new chart instance with the filtered data
  const chartData = {
    labels: filteredData.map(item => item.title),
    datasets: [
      {
        label: 'Revenue',
        data: filteredData.map(item => item.revenue),
        borderColor: 'rgb(219, 112, 147)', // pinkish color
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  const canvas = document.getElementById('bubbleChart');
  const ctx = canvas.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Title',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Revenue',
          },
          beginAtZero: true,
        },
      },
      plugins: {
        tooltip: {
          mode: 'nearest',
          intersect: false,
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    },
  });
}

// Fetch data from the API and create the chart
fetch('/api/directors')
  .then(response => response.json())
  .then(data => {
    createChart(data);
    // Add an event listener to update the chart when the director selection changes
    const directorSelector = document.getElementById('directorSelector');
    directorSelector.addEventListener('change', event => {
      updateChart(event.target.value);
    });
  })
  .catch(error => {
    console.error('Error fetching directors:', error);
  });
