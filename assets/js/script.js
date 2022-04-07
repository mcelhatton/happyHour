
// OMDb API mobie urls / variables
// let searchValue = 'type=movie';
// const movieApiKey = 'a0d72e1';
// const movieApiUrl = `https://www.omdbapi.com/?${searchValue}&&apikey=${movieApiKey}`;
// const moviePosterUrl = `https://img.omdbapi.com/?apikey=${movieApiKey}&`;
// trivia urls / variables
const triviaApiUrl = `https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple`;
const triviaCategoryLookupUrl = `https://opentdb.com/api_category.php`;


// the movie db api
const movieApiKey = '42dbe956de7a0a7cd46f2c0cd6110ac2'
//const movieApiUrl = 'https://api.themoviedb.org/3/movie/76341?api_key=42dbe956de7a0a7cd46f2c0cd6110ac2'

// Url to get genere list and id's
//const movieApiUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=42dbe956de7a0a7cd46f2c0cd6110ac2&language=en-US'

// Url to get list of movies for a specific genre (this is url for action)
const movieApiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=42dbe956de7a0a7cd46f2c0cd6110ac2&with_genres=28'

// Url to get genere list and id's
fetch(movieApiUrl).then(function(response) {
  response.json().then(function(data) {
    console.log(data);
  });
});

// fetch(triviaCategoryLookupUrl).then(function(response) {
//   response.json().then(function(data) {
//     console.log(data);
//   });
// });

// fetch(triviaApiUrl).then(function(response) {
//   response.json().then(function(data) {
//     console.log(data);
//   });
// });

// select category


// load selected category questions
