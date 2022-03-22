// function to compare object.keys
const checkProperties = (obj, source) => Object.keys(source).every(key => obj.hasOwnProperty(key));

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
    button.addEventListener('click', showDetails(pokemon));
  }

  // show Pokemon details 
  function showDetails(pokemon) {
    console.log(pokemonList.filter(examinePokemon => examinePokemon.name === pokemon));
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails
  }
})();

// add Eevee
pokemonRepository.add({name: "Eevee", height: 1.0, type: ['normal']})

// call private addListItem function to add the pokemon nav list to page
pokemonRepository.getAll().forEach( poke => pokemonRepository.addListItem(poke));



