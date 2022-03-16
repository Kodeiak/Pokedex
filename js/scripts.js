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

for (let i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
  if (pokemonList[i].height > .6) {
    document.write(' - Wow, that\'s big!<br>');
  } else {
    document.write('<br>');
  }
}