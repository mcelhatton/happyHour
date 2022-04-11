///// application variables

let userSelectionForm = $('#wf-form-submitForm');
let headerEl = $('#header');
let heroEl = $('#hero');
let modalEl = $('#modalwrapper');
let modalSelectEl = $('#selectionwrapper')
let containerEl = $('#container');
let footerEl = $('#footer');
let moveGenreSelect = $('#moveGenreSelect');
let liquorSelect = $('#liquorSelect');
let recipeSelect = $('#recipeSelect');

///////// API KEYS

// the movie DB api key
const movieApiKey = '42dbe956de7a0a7cd46f2c0cd6110ac2';

// recipe api key
const recipeApiKey = 'aaa2f0547807454dbadffba65a6a4360';

/// hide header, container and footer elements
headerEl.hide();
heroEl.hide();
containerEl.hide();
footerEl.hide();
$( document ).ready(fetchGenres);

$('#wf-form-submitForm').submit(function(event){
  event.preventDefault();

  // hide modal show / suggestions
  
  headerEl.show();
  heroEl.show();
  containerEl.show();
  footerEl.show();
  modalEl.hide();
  modalSelectEl.hide();

  ////// GET VALUE FROM MODAL MOVIE, DRINK AND RECIPE SELECTION
  let movieSelection = moveGenreSelect.val();
  let liquorSelection = liquorSelect.val();
  let recipeSelection = recipeSelect.val();

  /////// SAVE MOVIE, DRINK AND RECIPE SELECTION TO LOCAL STORAGE
  localStorage.setItem('movieGenreSelect', movieGenreSelect);
  localStorage.setItem('liquorSelect', liquorSelect);
  localStorage.setItem('recipeSelect', recipeSelect);

  console.log(movieSelection);
  console.log(liquorSelection);
  console.log(recipeSelection);

  // fetch movie selection from form submit 
  fetchMovies(movieGenreSelect);

  // fetch drink selection from form submit
  getDrink();

  // fetch recipe selection from form submit
  fetchRecipeDetails(recipeSelect);
  
  recipeSearch = $('#recipeSelect').val();
    fetchRecipes(recipeSearch);
});

// get genres and load into dropdown select 
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
      $('#movieGenreSelect').append(`<option id="${id}">${name}</option>`);
    }
  }

/////// FETCH MOVIE SELECTION
  function fetchMovies(selected) {
    const movieApiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${movieApiKey}&with_genres=${selected}`;

    fetch(movieApiUrl).then(function(response) {
      response.json().then(function(data) {
        let randomNumber = ~~(Math.random() * 10);
        let moviePoster = data.results[randomNumber].poster_path;
        let moviePosterUrl = `https://image.tmdb.org/t/p/w500${moviePoster}`;
        $('#movie-image').attr('src', moviePosterUrl);
        $('#movie-title').text(data.results[randomNumber].title);
        $('#movie-details').text(data.results[randomNumber].overview);
        console.log(data);
        }); 
      });
  }

// END movie api code //////////////////////////////////

// Drinks code START

drinksData = [
  {
    'name': "Brandy",
    'url': 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Brandy',
  },{
    'name': "Gin",
    'url': 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin',
  },{
    'name': "Mezcal",
    'url': 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Mezcal',
  },{
    'name': "Rum",
    'url': 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum',
  },{
    'name': "Tequila",
    'url': 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Tequila',
  },{
    'name': "Whiskey",
    'url': 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Whiskey',
  },{
    'name': "Vodka",
    'url': 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka',
  }
]

// Create option elements in dropdown for each spirit
for (i in drinksData){
  drinkName = drinksData[i].name

  option = document.createElement('option');
  dropdownOption = $("<option>")
    .attr('value', drinkName)
    .text(drinkName);

  $('#liquorSelect').append(dropdownOption);
  
}

function getDrink(){

  const selected = drinksData.find( ({ name }) => name === $('#liquorSelect').val() );
  url = selected.url

  fetch(url).then(function(response) {
    response.json().then(function(data) {

      selectedDrink = data.drinks[Math.floor(Math.random() * data.drinks.length)];
      console.log(selectedDrink)

      $('#drink-image').attr('src', selectedDrink.strDrinkThumb); // replace image
      $('#drink-title').text(selectedDrink.strDrink); // replace drink name
  
    });
  });
}

// END of drinks code



previousResults = []

// When main button is clicked, serve up movie and drink suggestions
//$('#main-button').click(function(){
 // result = {}
 // getDrink()

  //saveResult();
  
//})

// Save to local storage
var saveResult = function () {
  localStorage.setItem("eventsArray", JSON.stringify(previousResults));

};


function fetchRecipes(){

const recipeApiUrl = `https://api.spoonacular.com/recipes/search?query=${recipeSearch}&number=10&apiKey=${recipeApiKey}`;
  console.log(recipeApiUrl);
    fetch(recipeApiUrl).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
        
        let randomNumber = ~~(Math.random() * 10);
        let randomRecipe = data.results[randomNumber].id;
        fetchRecipeDetails(randomRecipe);
        
        }); 
      });
  }
 ////// FETCH RECIPE DETAILS
  function fetchRecipeDetails(randomRecipe) {
    const recipeDetailUrl = `https://api.spoonacular.com/recipes/${randomRecipe}/information?apiKey=${recipeApiKey}`;

    fetch(recipeDetailUrl).then(function(response) {
      response.json().then(function(data) {

        let jsonObject = data;
        let jsonObjectStringify = JSON.stringify(jsonObject).replace(/<b>/g, "");
        let newJsonObject = JSON.parse(jsonObjectStringify);
        
        $('#recipe-image').attr('src', data.image); // replace image
        $('#recipe-title').text(data.title);
        $('#recipe-details').text(newJsonObject.summary);
       // $('#recipe-ingredients').text(data.)
        console.log(data);
        }); 
      });
  }