const pokemonList = document.getElementById("pokemonList")

async function fetchPokemonData(pokemonId){
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        const data = await response.json()
        console.log(data)
        return data
        
    } catch (error) {
        console.error(error)
        return false
    }
}

function displayPokemon(pokemon){
    const pokemonCard = document.createElement("div")
    pokemonCard.classList.add("pokemon-card")
    console.log(pokemon)
    pokemonCard.innerHTML = `
        <img src="${pokemon.sprites.front_shiny}" alt="imagen de ${pokemon.name}">
        <h3>Nombre: ${pokemon.name} </h3>
        <h2>Id: ${pokemon.id} </h2>
`
    pokemonList.appendChild(pokemonCard)
}

async function loadPokedex(){
    for (let i=1;i<=50; i++){
        const pokemon = await fetchPokemonData(i)
    displayPokemon(pokemon)
}
}
loadPokedex()