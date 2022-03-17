//create array that will contain pokemon data
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

document.write('<div class="pokemen-container">');

pokemonList.forEach( poke => {
  //List pokemon features
  document.write('<p class="pokemon">' + poke.name + '<br>Height: ${poke.height}')
  //check height
  if (poke.height > .6) {
    document.write('<br>Wow, that\'s big!</p>');
  } else {
    document.write('</p>');
  }
});
document.write('</div>');