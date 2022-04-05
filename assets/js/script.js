
// OMDb API mobie urls / variables
let searchValue = 'type=movie';
const movieApiKey = 'a0d72e1';
const movieApiUrl = `https://www.omdbapi.com/?${searchValue}&&apikey=${movieApiKey}`;
const moviePosterUrl = `https://img.omdbapi.com/?apikey=${movieApiKey}&`;
// trivia urls / variables
const triviaApiUrl = `https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple`;
const triviaCategoryLookupUrl = `https://opentdb.com/api_category.php`;

fetch(triviaCategoryLookupUrl).then(function(response) {
  response.json().then(function(data) {
    console.log(data);
  });
});

fetch(triviaApiUrl).then(function(response) {
  response.json().then(function(data) {
    console.log(data);
  });
});

// select category


// load selected category questions
