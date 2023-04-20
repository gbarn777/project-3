const url = "http://localhost:5000/api/movies"
// const moviesData = d3.json(url);
// console.log("Data Promise: ", moviesData);

d3.json(url).then(function(data) {
  console.log(data);
  processData(data);
  processData2(data);
  processData3(data);
}
);

function processData(data) {
    // Group movies by year
    moviesByYear = groupMoviesByYear(data);

    // Group movies by genre
    moviesByGenre = groupMoviesByGenre(data);

    // Plot
    createPlot(data);
}

function groupMoviesByYear(movies) {
  // Create an object to hold the movies by year
  const moviesByYear = {};
    
  // Loop through the movies and group them by year
  movies.forEach(movie => {
    const year = new Date(movie.release_date).getFullYear();
    if (!moviesByYear[year]) {
         moviesByYear[year] = [];
    }
    moviesByYear[year].push(movie);
  });
   
  // Return the movies grouped by year
  console.log(moviesByYear);
  return moviesByYear
} 

function groupMoviesByGenre(movies) {
  // Create an object to hold the movies by year
  const moviesByGenre = {};

  // Loop through the movies and group them by year
  movies.forEach(movie => {
    const genre = movie.genre;
    if (!moviesByGenre[genre]) {
      moviesByGenre[genre] = [];
    }
    moviesByGenre[genre].push(movie);
  });

  // Return the movies grouped by year
  console.log(moviesByGenre);
  return moviesByGenre
}

function createPlot() {
  const xData = Object.keys(moviesByYear);

  // Create the traces for each genre
  const traces = Object.keys(moviesByGenre).map(genre => {
    // Get the y data for the genre
    const yData = xData.map(year => moviesByGenre[genre].filter(movie => new Date(movie.release_date).getFullYear() === parseInt(year)).length);

    return {
        x: xData,
        y: yData,
        name: genre,
        type: 'bar'
      };
    });

    // Set the layout for the plot
    const layout = {
      title: 'Number of Movies By Genre',
      xaxis: {
        title: 'Release Year'
      },
      yaxis: {
        title: 'No of Movies by Genre'
      }
    };

    // Create the plot
    Plotly.newPlot('plot1', traces, layout);
}






// const url = "http://localhost:5000/api/movies";

// // Call the API to get movies data
// d3.json(url).then(function(data) {
//   console.log(data);
//   processData2(data);
// });

function processData2(data) {
  // Group movies by year
  const moviesByYear = groupMoviesByYear2(data);

  // Group movies by genre
  const moviesByGenre = groupMoviesByGenre2(data);

  // Get the dropdown element
  const genreDropdown = document.getElementById("genre-select");

  // Set the default selected value
  const defaultGenre = "Animation";
  genreDropdown.value = defaultGenre;

  // Add an event listener to the dropdown menu
  genreDropdown.addEventListener("change", function(event) {
    const selectedGenre = event.target.value;
    console.log("Selected genre:", selectedGenre);

    // Filter movies by selected genre
    const filteredMovies = moviesByGenre[selectedGenre];

    // Group filtered movies by year
    const filteredMoviesByYear = groupMoviesByYear2(filteredMovies);

    // Create the plot
    createPlot2(filteredMoviesByYear, selectedGenre);
  });

  // Create the plot
  createPlot2(moviesByYear, defaultGenre);
}

function groupMoviesByYear2(movies) {
  // Create an object to hold the movies by year
  const moviesByYear = {};

  // Loop through the movies and group them by year
  movies.forEach(movie => {
    const year = new Date(movie.release_date).getFullYear();
    if (!moviesByYear[year]) {
      moviesByYear[year] = [];
    }
    moviesByYear[year].push(movie);
  });

  // Return the movies grouped by year
  console.log(moviesByYear);
  return moviesByYear;
}

function groupMoviesByGenre2(movies) {
  // Create an object to hold the movies by genre
  const moviesByGenre = {};

  // Loop through the movies and group them by genre
  movies.forEach(movie => {
    const genre = movie.genre;
    if (!moviesByGenre[genre]) {
      moviesByGenre[genre] = [];
    }
    moviesByGenre[genre].push(movie);
  });

  // Return the movies grouped by genre
  console.log(moviesByGenre);
  return moviesByGenre;
}

function createPlot2(data, genre) {
  const xData = Object.keys(data);

  // Create the traces for the genre
  const traces = [{
    x: xData,
    y: xData.map(year => data[year].length),
    name: genre,
    type: 'bar'
  }];

  // Set the layout for the plot
  const layout = {
    title: `Number of ${genre} Movies By Year`,
    xaxis: {
      title: 'Release Year'
    },
    yaxis: {
      title: 'Number of Movies'
    }
  };

  // Create the plot
  Plotly.newPlot('plot2', traces, layout);
}









function processData3(data) {
  var genres = ["Animation", "Drama", "Adventure", "Action", "Science Fiction", "Mystery", "Crime", "Fantasy", "Thriller", "Horror", "Comedy", "Documentary", "Romance", "Family", "Music", "War", "Western", "History", "TV Movie"];

  // Create an object to store total revenue and movie count for each genre
  var genreData = {};
  genres.forEach(function(genre) {
  genreData[genre] = {totalRevenue: 0, movieCount: 0};
  });

  // Calculate total revenue and movie count for each genre
  data.forEach(function(movie) {
    genreData[movie.genre].totalRevenue += movie.revenue;
    genreData[movie.genre].movieCount += 1;
  });

// Calculate average revenue for each genre
var avgRevenue = [];
genres.forEach(function(genre) {
  var revenue = genreData[genre].totalRevenue / genreData[genre].movieCount;
  avgRevenue.push(revenue);
});

// Create a trace for the bar chart
var trace = {
 x: genres,
 y: avgRevenue,
 type: 'bar'
};

// Create a layout for the bar chart
var layout = {
 title: 'Average Revenue by Genre',
 xaxis: {
   title: 'Genre'
 },
 yaxis: {
   title: 'Average Revenue'
 }
};

// Create the bar chart
Plotly.newPlot('plot3', [trace], layout);
}

