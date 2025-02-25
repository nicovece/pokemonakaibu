/* pokemonlist IIFE */
let pokemonRepository = (function () {
  /* Array of objects with Pokémon data */
  let pokemonList = [
    {
      name: 'Venusaur',
      height: 2,
      types: ['grass', 'poison'],
      weight: 100
    },
    {
      name: 'Dragonite',
      height: 2.2,
      types: ['dragon', 'flying'],
      weight: 210
    },
    {
      name: 'Charizard',
      height: 1.7,
      types: ['fire', 'flying'],
      weight: 90
    },
    {
      name: 'Blastoise',
      height: 1.6,
      types: ['water'],
      weight: 85
    },
    {
      name: 'Butterfree',
      height: 1.1,
      types: ['bug', 'flying'],
      weight: 32
    },
    {
      name: 'Beedrill',
      height: 1,
      types: ['bug', 'poison'],
      weight: 29
    },
    {
      name: 'Pidgeot',
      height: 1.5,
      types: ['normal', 'flying'],
      weight: 39
    },
    {
      name: 'Raticate',
      height: 0.7,
      types: ['normal'],
      weight: 18
    }
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll,
    add
  };
})();

/* Insert header */
document.write(
  '<header class="page-header"><h1 class="page-header__item">PokémonĀkaibu</h1></header>'
);
/* Insert main content */
document.write('<main><section class="content--main">');
/* Insert pokemon list */
document.write('<ul class="pokelist">');
pokemonRepository.add({
  name: 'Pikachu',
  height: 0.4,
  types: ['electric'],
  weight: 6
});
pokemonRepository.add({
  name: 'Raichu',
  height: 0.8,
  types: ['electric'],
  weight: 30
});
pokemonRepository.add({
  name: 'Sandslash',
  height: 1,
  types: ['ground'],
  weight: 29
});
/* Loop through the array and display Pokémon data */
pokemonRepository.getAll().forEach((pokemon) => {
  document.write(
    `<li class="pokelist__item"><h2 class="pokelist__name">${pokemon.name}</h2> <span class="pokelist__data">height: ${pokemon.height}</span>`
  );
  /* Highlight Pokémon with height > 2 */
  if (pokemon.height > 2) {
    document.write(
      '<strong class="pokelist__highlight">Wow, that\'s big</strong>'
    );
  }
  document.write('</li>');
});
/* Close pokemon list and main content */
document.write('</ul></section></main>');
/* Insert footer */
document.write(
  '<footer class="page-footer"><small>PokémonĀkaibu</small></footer>'
);
