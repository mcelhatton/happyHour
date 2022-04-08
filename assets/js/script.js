
// the movie DB api key
const movieApiKey = '42dbe956de7a0a7cd46f2c0cd6110ac2';

// start movie api code //////////////////////////////////

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

  $('#field-2').append(dropdownOption);
  
}

function getDrink(){

  const selected = drinksData.find( ({ name }) => name === $('#field-2').val() );
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


previousResults = {}

// When main button is clicked, serve up movie and drink suggestions
$('#main-button').click(function(){

  getDrink()


  // Save text when clicking save button
  drink = $('#drink-title').text()

  
  saveEvents();

})


// Code for local storage



// Save to local storage
var saveEvents = function () {
  localStorage.setItem("eventsArray", JSON.stringify(previousResults));

};
