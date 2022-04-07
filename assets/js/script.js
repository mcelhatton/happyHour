
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
  }
]

// Drinks api

for (i in drinksData){

  drinkName = drinksData[i].name

  varName = drinkName.toLowerCase() + "Url"
  console.log(varName)
  varName  = drinksData[i].url 
 
  var option = document.createElement('option');

  var dropdownOption = $("<option>")
    .attr('value', drinkName.toLowerCase())
    .text(drinkName);

  $('#drink-form-select').append(dropdownOption);
}

$('#drink-form-select').on("click", "option", function () {
 console.log("hi")
});


// fetch(brandyUrl).then(function(response) {
//   response.json().then(function(data) {
//   //console.log(data);
//   });
// });

// $('#drink-form').on("click", "p", function () {
//   var text = $(this).text().trim();

//   var textInput = $("<textarea>").addClass("form-control col-9").val(text);
//   $(this).replaceWith(textInput);
//   textInput.trigger("focus");

// });


// select category


// load selected category questions
