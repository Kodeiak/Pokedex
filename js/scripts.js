//function to compare object.keys
const checkProperties = (obj, source) => Object.keys(source).every(key => obj.hasOwnProperty(key));

//create array that will contain pokemon data
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

  //function to access array of Pokemon
  function getAll() {
    return pokemonList;
  }

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

  return {
    getAll: getAll,
    add: add
  }
})();

pokemonRepository.add({name: "Eevee", height: 1.0, type: ['normal']})
console.log(pokemonRepository.getAll());

//start container for list of pokemon
document.write('<div class="pokemon-container">');

pokemonRepository.getAll().forEach( poke => {
  //List pokemon features
  document.write(`<p class="pokemon"> ${poke.name} <br>Height: ${poke.height}`)
  //check height
  if (poke.height > .6) {
    document.write('<br>Wow, that\'s big!</p>');
  } else {
    document.write('</p>');
  }
});
//end poke list container
document.write('</div>');



