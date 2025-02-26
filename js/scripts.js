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
  /* Function to get all Pokémon */
  function getAll() {
    return pokemonList;
  }

  /* Function to add Pokémon to the array */
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

  /* Function to show Pokémon details */
  function showDetails(pokemon) {
    console.log(pokemon);
  }
  /* Function to create a button for each Pokémon */
  function createButton(pokemon) {
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokelist__button');
    /* Event listener to show Pokémon details */
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
    return button;
  }

  /* Function to add Pokémon to the list */
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokelist');
    let listItem = document.createElement('li');
    listItem.classList.add('pokelist__item');
    pokemonList.appendChild(listItem);
    /* Append button to list item */
    listItem.appendChild(createButton(pokemon));
  }

  /* Filter the pokemonList array to find Pokemon by name eg Venusaur */
  const ageAppropriate = pokemonList.filter((pokemon) =>
    pokemon.name.includes('Venusaur')
  );
  console.log(ageAppropriate);
  return {
    getAll,
    add,
    addListItem,
    showDetails
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
  pokemonRepository.addListItem(pokemon);

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
