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
      showModal(pokemon);
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
    listItem.classList.add(
      'list-group-item',
      'pokelist__item',
      'col-12',
      'col-md-4',
      'border-0',
      'p-3',
      'm-0'
    );
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
        item.imageUrl = details.sprites.other['official-artwork'].front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
        item.types = details.types;
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

  /* Modal */

  let modalContainer = document.querySelector('#pokemodal__container');

  function showModal(pokemon) {
    modalContainer.innerHTML = '';
    /* Create the modal itself */
    let modal = document.createElement('div');
    modal.classList.add('pokemodal');
    modalContainer.appendChild(modal);

    /* Create and insert modal elements */
    /* Pokemon name */
    let titleElement = document.createElement('h1');
    titleElement.classList.add('pokemodal__name');
    titleElement.innerHTML =
      '<span class="pokemodal__id">' + pokemon.id + '</span> ' + pokemon.name;
    modal.appendChild(titleElement);
    // console.log(pokemon);
    /* Pokemon name */
    let image = document.createElement('img');
    image.classList.add('pokemodal__image');
    image.src = pokemon.imageUrl;
    modal.appendChild(image);

    /* Close button */
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('pokemodal__close');
    closeButtonElement.innerHTML = '<span class="sr-only">Close</span>';
    closeButtonElement.addEventListener('click', hideModal);
    modal.appendChild(closeButtonElement);

    /* Pokemon databox */
    let pokemonData = document.createElement('div');
    pokemonData.classList.add('pokemodal__data');
    modal.appendChild(pokemonData);

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

    // show modal
    modalContainer.classList.add('pokemodal__container--visible');
    document.body.classList.add('is-modal-open');

    // close modal when clicking on overlay
    modalContainer.addEventListener('click', (e) => {
      // check if the target is the modal itself
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  function hideModal() {
    modalContainer.classList.remove('pokemodal__container--visible');
    document.body.classList.remove('is-modal-open');
    // if (dialogPromiseReject) {
    //   dialogPromiseReject();
    //   dialogPromiseReject = null;
    // }
  }

  /* Event listener to hide modal when pressing ESC */
  window.addEventListener('keydown', (e) => {
    if (
      e.key === 'Escape' &&
      modalContainer.classList.contains('pokemodal__container--visible')
    ) {
      hideModal();
    }
  });

  return {
    add,
    getAll,
    addListItem,
    showDetails,
    loadList,
    loadDetails
  };
})();

pokemonRepository.loadList().then(function () {
  /* Loop to add Pokémon to the list */
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
