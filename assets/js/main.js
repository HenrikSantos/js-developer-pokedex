const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name text-lg">${pokemon.name}</span>

          <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}" alt="${pokemon.name}" />
          </div>

          <h1 class="text-white text-sm">Stats:</h1>
          <div class="stats mb-3 text-xs text-white font-medium">
            <p>Health: ${pokemon.hp}</p>
            <p>Defense: ${pokemon.defense}</p>
            <p>Speed: ${pokemon.speed}</p>
            <p>Height: ${pokemon.height}m</p>
          </div>

          <h1 class="text-white text-sm">Skills:</h1>
          <ul class="abilities">
            ${pokemon.abilities.map((abilities) => `<li class="ability mt-2 ${pokemon.types[0]}">${abilities}</li>`).join('')}
          </ul>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})