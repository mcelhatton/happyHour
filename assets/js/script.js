
// OMDb API mobie urls / variables
let searchValue = 't=matrix';
const movieApiKey = 'a0d72e1';
const movieApiUrl = `https://www.omdbapi.com/?${searchValue}&&apikey=${movieApiKey}`;

//const moviePosterUrl = `https://img.omdbapi.com/?apikey=${movieApiKey}&`;


let musicGenreUrl ='https://binaryjazz.us/wp-json/genrenator/v1/genre/';


// the movie db api
//const movieApiKey = '42dbe956de7a0a7cd46f2c0cd6110ac2'
//const movieApiUrl = 'https://api.themoviedb.org/10/movie/550?api_key=42dbe956de7a0a7cd46f2c0cd6110ac2'


// trivia urls / variables
const triviaApiUrl = `https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple`;
const triviaCategoryLookupUrl = `https://opentdb.com/api_category.php`;

fetch(musicGenreUrl).then(function(response) {
  response.json().then(function(data) {
    console.log(data);
    }); 
  });

