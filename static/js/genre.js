const url = "http://localhost:5000/api/movies"
// const moviesData = d3.json(url);
// console.log("Data Promise: ", moviesData);

d3.json(url).then(function(data) {
  console.log(data);
  processData(data);
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
        type: 'scatter'
      };
    });

    // Create the plot
    Plotly.newPlot('plot', traces);
}

