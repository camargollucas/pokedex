const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonShiny = document.querySelector('.btn-shiny');

let searchPokemon = 1;
let isShinyMode = false;

const fetchPokemon = async (pokemon) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  if (isShinyMode) {
    url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;
  }

  const APIResponse = await fetch(url);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const getShinySprite = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    const spriteUrl = isShinyMode
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${data.id}.gif`
      : data.sprites.versions['generation-v']['black-white']['animated']['front_default'];

    pokemonImage.style.display = 'block';

    if (isShinyMode) {
      pokemonName.innerHTML = ` ${data.name}`;
      pokemonNumber.innerHTML = data.id;
    } else {
      pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id;
    }

    pokemonImage.src = spriteUrl;
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

buttonShiny.addEventListener('click', () => {
  isShinyMode = !isShinyMode;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
