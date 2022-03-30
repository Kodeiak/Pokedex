// create array that will contain pokemon data
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Access array of Pokemon
  function getAll() {
    return pokemonList;
  }

  // add additional Pokemon as objects
  function add(pokemon) {
    if (typeof pokemon !== "object") {
      return alert("Must be an object");
    } 
    return pokemonList.push(pokemon);
  }

  // add Pokemon to DOM list
  function addListItem (pokemon) {
    // assign node variables for list, list items and buttons
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    // give button content and class
    button.innerText = `${pokemon.name}`;
    $(button).addClass("btn btn-primary");
    $(button).attr("type", "button");
    $(button).attr("data-toggle", "modal");
    $(button).attr("data-target", "#pokemon-modal");


    $(listItem).addClass("list-group-item  col-lg-4 col-md-6 col-sm-12");

    // append button to list item and list item to list
    $(listItem).append(button);
    $(".list-group").append(listItem);

    // listen for button click
    $(button).on("click", () => {
      $(button).addClass("active-pokemon");
      showDetails(pokemon);
    });
  }

  // show Pokemon details modal
  function showDetails(pokemon) {
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
    });
  }

  // load details
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
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
    $(".modal-title").empty().append(title);
    $(".modal-body_image").attr("src", image);
    $(".modal-body_text").empty().append(text);
  }

return {
  getAll: getAll,
  add: add,
  addListItem: addListItem,
  showDetails: showDetails,
  loadList: loadList,
  loadDetails: loadDetails,
  showModal: showModal
};
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

