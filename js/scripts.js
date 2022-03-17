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

document.write('<div class="pokemen-container">')
for (let i = 0; i < pokemonList.length; i++) {
  document.write('<p class="pokemon">' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
  if (pokemonList[i].height > .6) {
    document.write(' - Wow, that\'s big!</p>');
  } else {
    document.write('</p>');
  }
}
document.write('</div>')