/* pokemonlist IIFE */
let pokemonRepository = (function () {
  /* Array to store Pokémon */
  let pokemonList = [];
  let pokemonListFull = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  let limit = 18; // Reduced limit for better infinite scroll experience

  /* Function to get all Pokémon */
  function getAll() {
    return pokemonList;
  }

  function filterPokemon() {
    let searchInput = document.querySelector('#searchInput');
    let searchValue = searchInput.value.toLowerCase();
    let pokemons = document.querySelectorAll('.pokelist__item');
    pokemons.forEach(function (pokemon) {
      if (
        pokemon.getAttribute('data-name').toLowerCase().indexOf(searchValue) >
        -1
      ) {
        pokemon.classList.remove('d-none');
      } else {
        pokemon.classList.add('d-none');
      }
    });
  }

  searchInput.addEventListener('input', function () {
    filterPokemon();
  });

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
      showModal(pokemon);
    });
  }

  /* Function to create a button for each Pokémon */
  function createButton(pokemon) {
    let button = document.createElement('button');
    /* get pokemon id by its url and use it to get the image */
    var urlparts = pokemon.detailsUrl.split('/');
    let pokemonId = urlparts[urlparts.length - 2];

    /* Get pokemon image */
    let buttonImage =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
      pokemonId +
      '.png';
    fetch(buttonImage)
      .then(function (response) {
        if (!response.ok) {
          console.log(response + ' error ' + pokemonId);
          throw new Error('Not 2xx response ', { cause: response });
        } else {
          button.style.backgroundImage = `url(${buttonImage})`;
        }
      })
      .catch(function (error) {
        console.log(pokemonId + ' err ' + error);
      });

    /* Pokémon name */
    let pokelistName = document.createElement('span');
    pokelistName.innerText = pokemon.name;
    pokelistName.classList.add('pokelist__name');
    button.appendChild(pokelistName);
    button.classList.add(
      'btn',
      'btn-outline-primary',
      'btn-lg',
      'pokelist__button'
    );
    /* Bootstrap modal button attributes */
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#pokemodal__container');
    button.setAttribute('data-pokemon-id', pokemonId);
    /* Event listener to show Pokémon details */
    button.addEventListener('click', function () {
      showDetails(pokemon);
      console.log(pokemon);
    });
    return button;
  }

  /* Function to add Pokémon to the list */
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokelist');
    let listItem = document.createElement('li');
    listItem.classList.add(
      'list-group-item',
      'pokelist__item',
      'col-6',
      'col-md-4',
      'col-lg-3',
      'col-xl-2',
      'border-0',
      'p-3',
      'm-0',
      'd-grid',
      'bg-transparent',
      pokemon.name
    );
    listItem.setAttribute('data-name', pokemon.name);
    pokemonList.appendChild(listItem);
    /* Append button to list item */
    listItem.appendChild(createButton(pokemon));
  }

  /* Function that loads a list of pokemon */
  function loadList(offset = 0) {
    showLoadingMessage();
    let adjustedLimit = Math.min(limit, maxPokemons - offset);
    return fetch(`${apiUrl}?limit=${adjustedLimit}&offset=${offset}`)
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
        item.imageUrl = details.sprites.other['official-artwork'].front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
        item.id = details.id;
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
    messageBox.appendChild(message);
    let messageSpan = document.createElement('span');
    messageSpan.innerText = 'Loading Pokémon List';
    message.appendChild(messageSpan);
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

  /* Modal */

  function showModal(pokemon) {
    let modalContainer = document.querySelector('#pokemodal__container');
    let modalBody = modalContainer.querySelector('.modal-body');
    let modalTitle = modalContainer.querySelector('.modal-title');
    modalTitle.innerText = '';
    modalBody.innerText = '';

    /* Modal content */
    /* Pokémon name as modal title */
    modalTitle.classList.add('pokemodal__name');
    modalTitle.innerText = pokemon.name;

    /* Pokémon id in the modal title */
    let pokemonId = document.createElement('span');
    pokemonId.classList.add('pokemodal__id');
    pokemonId.innerText = pokemon.id;
    modalTitle.appendChild(pokemonId);

    /* Pokemon image */
    let imageWrapper = document.createElement('div');
    imageWrapper.classList.add('pokemodal__image__wrapper');
    modalBody.appendChild(imageWrapper);
    let image = document.createElement('img');
    image.classList.add('pokemodal__image');
    image.src = pokemon.imageUrl;
    imageWrapper.appendChild(image);

    /* Pokemon databox */
    let pokemonData = document.createElement('div');
    pokemonData.classList.add('pokemodal__data');
    modalBody.appendChild(pokemonData);

    /* Pokemon profile data */
    let profileTitle = document.createElement('h2');
    profileTitle.innerText = 'Profile';
    pokemonData.appendChild(profileTitle);

    let profileList = document.createElement('ul');
    profileList.classList.add('pokemodal__profile');
    pokemonData.appendChild(profileList);

    let profileHeight = document.createElement('li');
    profileHeight.innerText = 'Height: ' + pokemon.height;
    profileList.appendChild(profileHeight);

    let profileWeight = document.createElement('li');
    profileWeight.innerText = 'Weight: ' + pokemon.weight;
    profileList.appendChild(profileWeight);

    /* Pokemon abilities data */
    let typesTitle = document.createElement('h2');
    typesTitle.innerText = 'Types';
    pokemonData.appendChild(typesTitle);

    let typesList = document.createElement('ul');
    typesList.classList.add('pokemodal__types');
    pokemonData.appendChild(typesList);
    pokemon.types.forEach((type) => {
      let typesItem = document.createElement('li');
      typesItem.innerText = type.type.name;
      typesList.appendChild(typesItem);
    });

    /* Pokemon abilities data */
    let abilitiesTitle = document.createElement('h2');
    abilitiesTitle.innerText = 'Abilities';
    pokemonData.appendChild(abilitiesTitle);

    let abilitiesList = document.createElement('ul');
    abilitiesList.classList.add('pokemodal__abilities');
    pokemonData.appendChild(abilitiesList);
    pokemon.abilities.forEach((ability) => {
      let abilityItem = document.createElement('li');
      abilityItem.innerText = ability.ability.name;
      abilitiesList.appendChild(abilityItem);
    });
  }

  return {
    add,
    getAll,
    addListItem,
    showDetails,
    loadList,
    loadDetails
  };
})();

let offset = 0;
let maxPokemons = 150; // Maximum number of Pokémon to fetch

pokemonRepository.loadList(offset).then(function () {
  /* Loop to add Pokémon to the list */
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

let scrollDebounce = true; // Debounce to prevent multiple scroll events
const loadMoreButton = document.querySelector('#loadMore'); // Load more button

/* Function to load more Pokémon */
function loadMore() {
  let totalItems = document.querySelectorAll('.pokelist__item').length;
  if (totalItems >= maxPokemons) {
    loadMoreButton.classList.add('d-none');
  }

  scrollDebounce = false; // Debounce to prevent multiple scroll events
  offset += 18; // Update offset
  pokemonRepository.loadList(offset).then(function () {
    pokemonRepository
      .getAll()
      .slice(offset)
      .forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
      });
  });
  setTimeout(function () {
    scrollDebounce = true;
  }, 500); // Debounce to prevent multiple scroll events
}

/* Infinite scroll implementation */
window.addEventListener('scroll', () => {
  /* Check if the user has scrolled to the bottom of the page, 
  if debounce is true and if the maximum set pokemon number is reached */
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
    scrollDebounce &&
    offset < maxPokemons
  ) {
    loadMore();
  }
});
loadMoreButton.addEventListener('click', function () {
  loadMore();
});

const currentYear = new Date().getFullYear();
let currentYearWrapper = document.querySelector('.current_year');
currentYearWrapper.innerText = currentYear;
