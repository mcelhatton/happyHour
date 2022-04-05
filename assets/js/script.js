
// OMDb API 

const movieApiKey = 'a0d72e1';
const movieApiUrl = `http://www.omdbapi.com/?t=matrix&&apikey=${movieApiKey}`;
const moviePosterUrl = `http://img.omdbapi.com/?apikey=${movieApiKey}&`;

fetch(movieApiUrl).then(function(response) {
  response.json().then(function(data) {
    console.log(data);
  });
});
