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
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
                fill: false,
              },
            ],
          };
          // Get the canvas element and create a chart
          const canvas = document.getElementById('myChart');
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
            },
          });
        }
        function updateChart(language) {
          let filteredData = originalData;
          if (language) {
            filteredData = originalData.filter(item => item.language === language);
          }
          // Update the chart labels and data
          chartInstance.data.labels = filteredData.map(item => item.title);
          chartInstance.data.datasets[0].data = filteredData.map(item => item.revenue);
          chartInstance.update();
        }
        // Fetch data from the API and create the chart
        fetch('/api/languages')
          .then(response => response.json())
          .then(data => {
            createChart(data);
            // Add an event listener to update the chart when the language selection changes
            const languageSelector = document.getElementById('languageSelector');
            languageSelector.addEventListener('change', event => {
              updateChart(event.target.value);
            });
          })
          .catch(error => {
            console.error('Error fetching languages:', error);
          });
