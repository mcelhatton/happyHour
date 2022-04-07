

const genereApiUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=42dbe956de7a0a7cd46f2c0cd6110ac2&language=en-US'



const movieApiKey = '42dbe956de7a0a7cd46f2c0cd6110ac2'
//const movieApiUrl = 'https://api.themoviedb.org/3/movie/76341?api_key=42dbe956de7a0a7cd46f2c0cd6110ac2'

// Url to get genere list and id's
const movieApiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=42dbe956de7a0a7cd46f2c0cd6110ac2&with_genres=28' 


// the movie db api
//const movieApiKey = '42dbe956de7a0a7cd46f2c0cd6110ac2'
//const movieApiUrl = 'https://api.themoviedb.org/10/movie/550?api_key=42dbe956de7a0a7cd46f2c0cd6110ac2'

fetch(genereApiUrl).then(function(response) {
  response.json().then(function(data) {
    console.log(data);
    }); 
  });

  fetch(movieApiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
      }); 
    });
