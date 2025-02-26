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

  const schema = Object.keys(pokemonList[0]);

  function add(pokemon) {
    if (typeof pokemon !== 'object') {
      return console.log('You can only add objects to this array');
    }
    let keys = Object.keys(pokemon);
    if (keys.length < schema.length) {
      return console.log('You need to add all the keys');
    }
    for (let i = 0; i < schema.length; i++) {
      if (!keys.includes(schema[i])) {
        return console.log('You need to add all the correct keys: ' + schema);
      }
    }
    pokemonList.push(pokemon);
  }
  /*
  I was trying to filter the Pokemon by name, but I couldn't get it to work. It was taking me too much time, so I asked Copilot. I am not submitting this function but leaving it here because I want to study it in the future.
  */
  // function findPokemon(pokemonList, name) {
  //   return pokemonList.filter((pokemon) => {
  //     let found = false;
  //     Object.values(pokemon).forEach((value) => {
  //       if (typeof value === 'string' && value.includes(name)) {
  //         found = true;
  //       }
  //     });
  //     return found;
  //   });
  // }

  const ageAppropriate = pokemonList.filter((activity) =>
    activity.name.includes('Venusaur')
  );
  console.log(ageAppropriate);
  return {
    getAll,
    add
  };
})();

/* Insert new pokemon into pokemon list */
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
  name: 'Gianni',
  height: 1,
  tyspe: ['ground'], // typo to check if adding condition works
  weight: 29
});
pokemonRepository.add({
  name: 'Sandslash',
  height: 1,
  types: ['ground'],
  weight: 29
});
/* Loop through the array and display Pokémon data */
pokemonRepository.getAll().forEach((pokemon) => {
  const pokemonList = document.querySelector('.pokelist');
  let listItem = document.createElement('li');
  listItem.classList.add('pokelist__item');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('pokelist__button');
  listItem.appendChild(button);
  pokemonList.appendChild(listItem);

  // button.addEventListener('click', function () {
  //   showDetails(pokemon);
  // });
  // function showDetails(pokemon) {
  //   console.log(pokemon);
  // }

  // document.write(
  //   `<li class="pokelist__item"><h2 class="pokelist__name">${pokemon.name}</h2> <span class="pokelist__data">height: ${pokemon.height}</span>`
  // );
  // /* Highlight Pokémon with height > 2 */
  // if (pokemon.height > 2) {
  //   document.write(
  //     '<strong class="pokelist__highlight">Wow, that\'s big</strong>'
  //   );
  // }
  // document.write('</li>');
});
