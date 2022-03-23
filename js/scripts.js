// create array that will contain pokemon data
let pokemonRepository = (function() {
  
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // function to access array of Pokemon
  function getAll() {
    return pokemonList;
  }

  // add additional Pokemon as objects
  function add(pokemon) {
    if (typeof pokemon !== 'object') {
      return alert("Must be an object");
    } 
    // else if (!checkProperties(pokemon, pokemonRepository.getAll()[0])) {
    //   alert("Properties do not align.");
    // } 
    else { 
      return pokemonList.push(pokemon);
    }
  }

  // add Pokemon to DOM list
  function addListItem (pokemon) {
    // assign node variables for list, list items and buttons
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    // give button content and class
    button.innerText = `${pokemon.name}`;
    button.classList.add('button');

    // append button to list item and list item to list
    listItem.appendChild(button);
    list.appendChild(listItem);

    // listen for button click
    button.addEventListener('click', () => showDetails(pokemon));
  }

  // show Pokemon details 
  function showDetails(pokemon) {
    loadDetails(pokemon).then( () => console.log(pokemon));
    }

  // load list
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      // json is the parent object found in the API.  .results is a key in that object
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }) .catch(function (e) {
      console.error(e);
    })
  }

  // load details
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl
    return fetch(url).then(function (response) {
      return response.json();
    })
    // details refers to the object that is returned by the promise in the first then
    .then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  }
})();

// // function to compare object.keys
// const checkProperties = (obj, source) => Object.keys(source).every(key => obj.hasOwnProperty(key));

// // add Eevee
// pokemonRepository.add({name: "Eevee", height: 1.0, type: ['normal']})

// // call private addListItem function to add the pokemon nav list to page
// pokemonRepository.getAll().forEach( poke => pokemonRepository.addListItem(poke));

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

