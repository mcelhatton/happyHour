///// application variables

let userSelectionForm = $('#wf-form-submitForm');
let headerEl = $('#header');
let heroEl = $('#hero');
let modalEl = $('#modalwrapper');
let modalSelectEl = $('#selectionwrapper')
let containerEl = $('#container');
let footerEl = $('#footer');
let movieResult = $('#movie-title');
let drinkResult = $('#drink-title');
let recipeResult = $('#recipe-title');


// Load local storage, or create variables if no local storage
var loadResults = function () {
  movieSelection = localStorage.getItem("movieSelection");
  drinkSelection = localStorage.getItem("drinkSelection");
  recipeSelection = localStorage.getItem("recipeSelection");

  // if nothing in localStorage, create eventsArray to store
  if (!movieSelection) {

    movieSelection = "";
    drinkSelection = "";
    recipeSelection = "";
  }
};

loadResults()

///////// API KEYS

// API #1 the movie DB api key https://developers.themoviedb.org/3/getting-started
const movieApiKey = '42dbe956de7a0a7cd46f2c0cd6110ac2';

// API #2 TheDrinkDB.COM No API key needed

// API #3 recipe api key https://spoonacular.com/food-api/docs
const recipeApiKey = 'aaa2f0547807454dbadffba65a6a4360';

/// at start of application (page load) hide header, container and footer elements
headerEl.hide();
heroEl.hide();
containerEl.hide();
footerEl.hide();
$( document ).ready(fetchGenres);

/////  Form and user selection from form submit pushed into apis 
$('#wf-form-submitForm').submit(function(event){
  event.preventDefault();

  // on submit hide modal show / suggestions
  headerEl.show();
  heroEl.show();
  containerEl.show();
  footerEl.show();
  modalEl.hide();
  modalSelectEl.hide();

   // Save to local storage and load previous results if there are any
  localStorageSaveAndLoad();

  // fetch movie selection from form submit 
  fetchMovies(movieGenreSelect);

  // fetch drink selection from form submit
  getDrink();

  // fetch recipe selection from form submit
  fetchRecipeDetails(recipeSelect);
  
  recipeSearch = $('#recipeSelect').val();
    fetchRecipes(recipeSearch);

});

 // Save and load local storage based on generated results
function localStorageSaveAndLoad(){

  // Get and save results to local storage
  setTimeout(function(){ 
    // Get text of results
    let movieSelection = movieResult.text();
    let drinkSelection = drinkResult.text();
    let recipeSelection = recipeResult.text();

    // Save results to local storage
    localStorage.setItem('movieSelection', movieSelection);
    localStorage.setItem('drinkSelection', drinkSelection);
    localStorage.setItem('recipeSelection', recipeSelection);
    
  }, 8000) 

  // Append data from local storage to previous results section
  if (movieSelection == "" | drinkSelection == "" | recipeSelection == ""){
    $('#previous-movie').append("n/a")
    $('#previous-drink').append("n/a")
    $('#previous-recipe').append("n/a")
  }else{
    $('#previous-movie').append(movieSelection)
    $('#previous-drink').append(drinkSelection)
    $('#previous-recipe').append(recipeSelection)
  }

}

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

// Drinks code START TheCocktailDB.com /////////////////////

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

///  get drink suggestion 
function getDrink(){

  const selected = drinksData.find( ({ name }) => name === $('#liquorSelect').val() );
  url = selected.url

  fetch(url).then(function(response) {
    response.json().then(function(data) {

      selectedDrink = data.drinks[Math.floor(Math.random() * data.drinks.length)];
      console.log(selectedDrink)

      $('#drink-image').attr('src', selectedDrink.strDrinkThumb); // replace image
      $('#drink-title').text(selectedDrink.strDrink); // replace drink name

      let drinkID = selectedDrink.idDrink;
      console.log(drinkID);
      fetchDrinkDetails(drinkID);
  
    });
  });
}
////// FETCH DRINK DETAILS /////

function fetchDrinkDetails(drinkID) {
  const drinkDetailUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkID}`;

  fetch(drinkDetailUrl).then(function(response) {
    response.json().then(function(data) {

      $('#drink-ingredients').empty();
      
      let ingredients = [data.drinks[0].strIngredient1,data.drinks[0].strIngredient2,data.drinks[0].strIngredient3,data.drinks[0].strIngredient4];
     
      for (i = 0; i < ingredients.length; i++) {
        $('#drink-ingredients').append(`<li>${ingredients[i]}</li>`);
      }
     
      }); 
    });
}


// END of drinks code


/////// RECIPE API CODE START ////
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
        let jsonObjectStringify = JSON.stringify(jsonObject);
        let newJsonObject = JSON.parse(jsonObjectStringify);
        
        $('#recipe-image').attr('src', data.image); // replace image
        $('#recipe-title').text(data.title);
        $('#recipe-details').text(newJsonObject.summary.replaceAll('<b>', "").replaceAll('</b>', ""));
       // $('#recipe-ingredients').text(data.)
        console.log(data);
        }); 
      });
  }
  
  //// END RECIPE API CODE ///

  

  
