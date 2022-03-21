// function to compare object.keys
const checkProperties = (obj, source) => Object.keys(source).every(key => obj.hasOwnProperty(key));

// function to filter Pokemon List by name
const filterPokemon = (searchInput) => console.log(pokemonRepository.getAll().filter(pokemon => pokemon.name === searchInput));

// create array that will contain pokemon data
let pokemonRepository = (function() {
  
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      type: [
        'grass', 
        'poision'
      ]
    },
    {
      name: 'Charmander',
      height: 0.6,
      type: [
        'fire'
      ]
    },
    {
      name: 'Pikachu',
      height: 0.4,
      type: [
        'electric'
      ]
    }
  ];

  // function to access array of Pokemon
  function getAll() {
    return pokemonList;
  }

  // add additional Pokemon as objects
  function add(newPoke) {
    if (typeof newPoke !== 'object') {
      return alert("Must be an object");
    } 
    else if (!checkProperties(newPoke, pokemonRepository.getAll()[0])) {
      alert("Properties do not align.");
    } 
    else { 
      return pokemonList.push(newPoke);
    }
  }

  // add Pokemon to DOM list
  function addListItem (pokemon) {
    // create list element variable
    let list = document.querySelector('.pokemon-list');
    // create list item element
    let listItem = document.createElement('li');
    // create buttons for each pokemon
    let button = document.createElement('button');

    // add pokemon's name to button
    button.innerText = `${pokemon.name}`;
    // add class to buttons
    button.classList.add('button');
    // add button to each list item
    listItem.appendChild(button);
    // add list item to parent list
    list.appendChild(listItem);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  }
})();

// add Eevee
pokemonRepository.add({name: "Eevee", height: 1.0, type: ['normal']})
console.log(pokemonRepository.getAll());

// call filterPokemon
filterPokemon("Eevee");

// call private addListItem function to add the pokemon nav list to page
pokemonRepository.getAll().forEach( poke => pokemonRepository.addListItem(poke));




