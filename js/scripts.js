//create array that will contain pokemon data
let pokemonRepository = (function() {
  
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      types: [
        'grass', 
        'poision'
      ]
    },
    {
      name: 'Charmander',
      height: 0.6,
      types: [
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

  function getAll() {
    return pokemonList;
  }

  function add(newPoke) {
    return pokemonList.push(newPoke);
  }

  return {
    getAll: getAll,
    add: add
  }
})();

//start container for list of pokemon
document.write('<div class="pokemen-container">');

pokemonRepository.getAll().forEach( poke => {
  //List pokemon features
  document.write('<p class="pokemon">' + poke.name + '<br>Height: ${poke.height}')
  //check height
  if (poke.height > .6) {
    document.write('<br>Wow, that\'s big!</p>');
  } else {
    document.write('</p>');
  }
});
//end poke list container
document.write('</div>');