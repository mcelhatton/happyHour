
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
   // console.log(data);
  });
});

fetch(triviaApiUrl).then(function(response) {
  response.json().then(function(data) {
   // console.log(data);
  });
});



// Drinks code START

drinksData = [
  {
    'name': "Brandy",
    'url': 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Brandy',
  },{
    'name': "Gin",
    'url': 'https://wwww.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin',
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
    'url': 'www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka',
  }
]

// Create option elements in dropdown for each spirit
for (i in drinksData){
  drinkName = drinksData[i].name
  url  = drinksData[i].url 

  option = document.createElement('option');
  dropdownOption = $("<option>")
    .attr('value', drinkName)
    .text(drinkName);

  $('#field-2').append(dropdownOption);
  
}

// When option is selected, call corresponding api url and randomly select drink
$('#field-2').change(function(){
  const selected = drinksData.find( ({ name }) => name === $(this).val() );
  url = selected.url
    fetch(url).then(function(response) {
      response.json().then(function(data) {
        selectedDrink = data.drinks[Math.floor(Math.random() * data.drinks.length)];
        console.log(selectedDrink)
      });
    });
})

// END of drinks code

// select category


// load selected category questions
