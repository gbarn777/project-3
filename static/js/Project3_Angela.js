// Mapping Budget vs Revenue by Certification using Highcharts library
// To use Highcharts, the highcharts.js file must be included in the server and referred to in the HTML file
// https://www.highcharts.com/docs/index

// Filter out films with certification "Not Avail"
let filteredFilms = films.filter(film => film.certification !== 'NOT AVAIL');

// Start by creating an empty object to store the data
let data = {};

// Loop through the filteredFilms array and extract the required data
for (let i = 0; i < filteredFilms.length; i++) {
  let film = filteredFilms[i];
  let certification = film.certification;
  if (!(certification in data)) {
    data[certification] = {
      budget: [],
      revenue: []
    };
  }
  data[certification].budget.push(film.budget);
  data[certification].revenue.push(film.revenue);
}

// Calculate the average revenue and budget for each certification group
let categories = Object.keys(data);
let budget_data = [];
let revenue_data = [];
for (let i = 0; i < categories.length; i++) {
  let certification = categories[i];
  let budget_avg = data[certification].budget.reduce((a, b) => a + b, 0) / data[certification].budget.length;
  let revenue_avg = data[certification].revenue.reduce((a, b) => a + b, 0) / data[certification].revenue.length;
  budget_data.push(budget_avg);
  revenue_data.push(revenue_avg);
}

// Create the chart using Highcharts
let chart = Highcharts.chart('container_AN', {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Avg. Box Office Revenue vs. Avg. Movie Budget by Certification Rating'
  },
  xAxis: {
    categories: categories
  },
  yAxis: {
    title: {
      text: 'Dollars'
    }
  },
  series: [{
    name: 'Budget',
    data: budget_data
  }, {
    name: 'Revenue',
    data: revenue_data
  }]
});

// ------------------------------------------------------------
// ------------------------------------------------------------
// Create another chart using c3 library for Revenue vs Rating Over Time  
// Start by creating an empty array to store the data
let data2 = [];

// Loop through the films array and extract the required data
for (let i = 0; i < films.length; i++) {
  let film = films[i];
  let facts = {
    id: film.id,
    title: film.title,
    release_date: new Date(film.release_date),
    budget: film.budget,
    revenue: film.revenue,
    certification: film.certification,
    movie_popularity: film.movie_popularity,
    rating: film.rating
  };
  data2.push(facts);
}

// Sort the data by release date
data2.sort((a, b) => a.release_date - b.release_date);

// Create an array of unique release dates
let release_dates = Array.from(new Set(data2.map(facts => facts.release_date)));


// Create an array of objects, one for each release date, containing the data for that date
let release_data = release_dates.map(date => {
  let films_on_date = data2.filter(facts => facts.release_date.getTime() === date.getTime());
  let budget_data = films_on_date.map(facts => facts.budget);
  let revenue_data = films_on_date.map(facts => facts.revenue);
  let rating_data = films_on_date.map(facts => facts.movie_popularity);
  return {
    date: date,
    budget_data: budget_data,
    revenue_data: revenue_data,
    rating_data: rating_data
  };
});

// Create the chart using c3 
// https://c3js.org/gettingstarted.html

let chart2 = c3.generate({
  bindto: '#chart_AN',
  data: {
    json: release_data,
    keys: {
      x: 'date',
      value: ['revenue_data', 'rating_data']
    },
    names: {
      revenue_data: 'Revenue',
      rating_data: 'Rating'
    },
    types: {
        revenue_data: 'line',
        rating_data: 'line'
    }
  },
  axis: {
    x: {
      type: 'timeseries',
      tick: {
        format: '%m/%d/%Y'
      }
    },
    y: {
      label: {
        text: 'Budget | Revenue | Rating',
        position: 'outer-middle'
      }
    }
  }
});

// ------------------------------------------------------------
// ------------------------------------------------------------
// Create a bubble chart using Plotly show to budget vs revenue by Movie Popularity/Rating
const bubbleData = [{
    x: films.map(film => film.revenue), // x-axis: release dates
    y: films.map(film => film.budget), // y-axis: ratings
    text: films.map(film => film.title), // text labels: movie titles
    mode: 'markers',
    marker: {
      size: films.map(film => film.rating), // bubble size: revenue
    //   sizemode: 'diameter',
      sizeref: 0.2,
      color: films.map(film => film.movie_popularity), // bubble color: movie popularity
      colorscale: 'Viridis',
      reversescale: true,
      opacity: 0.7
    }
  }];
  
  const bubbleLayout = {
    title: 'Movie Popularity by Revenue and Budget',
    margin: {t: 30},
    xaxis: { title: 'Revenue' },
    yaxis: { title: 'Budget' },
    hovermode: 'closest'
  };

  Plotly.newPlot('bubble_AN', bubbleData, bubbleLayout);