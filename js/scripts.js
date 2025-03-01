/* pokemonlist IIFE */
let pokemonRepository = (function () {
  /* Array to store Pokémon */
  let pokemonList = [];

  /* API URL */
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=2000';

  /* Function to get all Pokémon */
  function getAll() {
    return pokemonList;
  }

  /* Function to add Pokémon to the array */
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

  /* Function to show Pokémon details */
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
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

  /* Function that loads a list of pokemon */
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          // console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  /* Function that loads item details */
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (details) {
        /* Adding details to the list item  */
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        hideLoadingMessage();
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  (function () {
    let messageBox = document.createElement('div');
    messageBox.classList.add('pokelist__message');
    document.body.appendChild(messageBox);
    let message = document.createElement('h4');
    message.innerHTML = '<span>Loading Pokémon List</span>';
    messageBox.appendChild(message);
  })();

  function showLoadingMessage() {
    let messageBox = document.querySelector('.pokelist__message');
    messageBox.classList.add('pokelist__message--loading');
    document.body.classList.add('is-loading');
  }

  function hideLoadingMessage() {
    let messageBox = document.querySelector('.pokelist__message');
    messageBox.classList.remove('pokelist__message--loading');
    document.body.classList.remove('is-loading');
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function () {
  /* Loop to add Pokémon to the list */
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
