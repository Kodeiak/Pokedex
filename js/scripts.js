// create array that will contain pokemon data
let pokemonRepository = (function() {
  
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

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

  // show Pokemon details modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then( () => showModal(pokemon.name, `Height: ${pokemon.height}\n Type: Insert each type here \n`, pokemon.imageUrl)); // ${pokemon.types.forEach(item => item.type.name)}
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
      console.log(pokemon.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal (title, text, image) {
    // Clear all existing modal content
    modalContainer.innerHTML = '';

    // Add modal element
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentContainerElement = document.createElement('div');
    contentContainerElement.classList.add('content-container-element');

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let imageElement = document.createElement('img');
    imageElement.src = image;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(contentContainerElement);
    contentContainerElement.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    // Allow click out of modal to close
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    // Allow esc to close modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

  }

  function hideModal () {
    modalContainer.classList.remove('is-visible');
  }

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

