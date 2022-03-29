// create array that will contain pokemon data
let pokemonRepository = (function() {
  
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  // let modalContainer = document.querySelector('#modal-container');
  let modal = $('.modal')

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
    let list = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    // give button content and class
    button.innerText = `${pokemon.name}`;
    $(button).addClass('btn btn-primary');
    // $(button).attr('{
    //   'type': 'button',
    //   'data-bs-toggle': 'modal',
    //   'data-bs-target': '#pokemon-modal',
    // }');
    $(button).attr("type", "button");
    $(button).attr("data-toggle", "modal");
    $(button).attr("data-target", "#pokemon-modal");


    $(listItem).addClass("list-group-item  col-lg-4 col-md-6 col-sm-12");

    // append button to list item and list item to list
    listItem.appendChild(button);
    list.appendChild(listItem);

    // listen for button click
    button.addEventListener('click', () => {
      button.classList.add('active-pokemon');
      showDetails(pokemon);
    });
  }

  // show Pokemon details modal
  function showDetails(pokemon) {
    // console.log(`showDetails pokemon: ${pokemon}`); // [object Object]
    loadDetails(pokemon).then( () => showModal(pokemon.name, `Height: ${pokemon.height}\n Type: ${pokemon.types[0].type.name} \n`, pokemon.imageUrl)); // ${pokemon.types.forEach(item => item.type.name)}
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
    // details is object that is returned by the first then promise
    .then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal (title, text, image) {
    // Clear existing modal header text and body content and add new
    $('.modal-title').empty().append(title);
    $('.modal-body_image').attr('src', image);
    $('.modal-body_text').empty().append(text);
  }

function hideModal () {
  modal.removeClass('is-visible');
}

// Swipe gestures event listener //

let touchstartX = null;
let touchstartY = null;
let touchendX = null;
let touchendY = null;

window.addEventListener('touchstart', function(event) {
  touchstartX = event.changedTouches[0].screenX;
  touchendY = event.changedTouches[0].screenY;
  handleGesture();
}, false);

window.addEventListener('touchend', function(event) {
  touchendX = event.changedTouches[0].screenX;
  touchendY = event.changedTouches[0].screenY;
  handleGesture
}, false);

// allow swipe gestures to navigate list
function handleGesture() {
  // find active pokemon
  let activePokemon = document.querySelector('.active-pokemon');
  
  // Left swipe
  if (touchendX <= touchstartX) {
    // find next pokemon on the list and its index
    let nextPokemon = activePokemon.parentNode.nextSibling.firstChild;
    let nextPokemonIndex = getAll().findIndex(pokemon => pokemon.name === activePokemon.innerText) + 1;
    
    // go to next pokemon unless at end of list
    if (nextPokemonIndex >= getAll().length) {
      return;
    } else {
      showDetails(getAll()[nextPokemonIndex]);
      nextPokemon.classList.add('active-pokemon');
      activePokemon.classList.remove('active-pokemon');
    }
  }

  // Right swipe
  if (touchendX >= touchstartX) {
    // find previous pokemon and index
    let previousPokemon = activePokemon.parentNode.previousSibling.firstChild;
    let previousPokemonIndex = getAll().findIndex(pokemon => pokemon.name === activePokemon.innerText) - 1;
    
    // go to previous pokemon unless at start of list
    if (previousPokemonIndex <= 0) {
      return;
    } else {
      showDetails(getAll()[previousPokemonIndex]);
      previousPokemon.classList.add('active-pokemon');
      activePokemon.classList.remove('active-pokemon');
    }
  }
}
// End of swipe gesture event listener //

return {
  getAll: getAll,
  add: add,
  addListItem: addListItem,
  showDetails: showDetails,
  loadList: loadList,
  loadDetails: loadDetails,
  showModal: showModal,
  hideModal: hideModal
}
})();

// Find index of active pokemon
let index = pokemonRepository.getAll().findIndex(pokemon => pokemon.name === 'pikachu');


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

