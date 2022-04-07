
// the movie DB api key
const movieApiKey = '42dbe956de7a0a7cd46f2c0cd6110ac2';

// on page load fetch genre and load into dropdown list
$( document ).ready(fetchGenres);

function fetchGenres() {

const genreApiUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=42dbe956de7a0a7cd46f2c0cd6110ac2&language=en-US';

    fetch(genreApiUrl).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
        
          loadSelect(data);
        
        }); 
      });
  }
  
  function loadSelect(data) {
    let id = data.genres[1].id;
    let name = data.genres[1].name;

    for (i = 0; i < data.genres.length; i++) {
      id = data.genres[i].id;
      name = data.genres[i].name;
      $('#field').append(`<option>${name} : ${id}</option>`);
    }
  }

  $('#field').change(function(){
    const selected = $('#field').val();
    console.log(selected);
    let selection = selected.replace(/\D/g,'');
    fetchMovies(selection);
  });

  function fetchMovies(selection) {

    const movieApiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${movieApiKey}&with_genres=${selection}`;

    fetch(movieApiUrl).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
        }); 
      });
  }