const pokemonList = document.getElementById("pokemonList")
const pokemonDetail = document.getElementById("pokemonDetail")
const backToPokedexBtn = document.getElementById("backToPokedexBtn")
const pokemonInfo = document.getElementById ("pokemonInfo")

async function fetchPokemonData(pokemonId){
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        const data = await response.json()
        return data
        
    } catch (error) {
        console.error(error)
        return false
    }
}
function displayPokemon(pokemon){
    const pokemonCard =document.createElement("div")
    pokemonCard.classList.add("pokemon-card")
    pokemonCard.innerHTML = `
        <img src="${pokemon.sprites.front_shiny}" alt="imagen de ${pokemon.name}">
        <h3>Nombre: ${pokemon.name} </h3>
        <h2>Id: ${pokemon.id} </h2>
`   
    pokemonCard.addEventListener("click",()=>showPokemonDetail(pokemon))
    pokemonList.appendChild(pokemonCard)
}

function showPokemonDetail(pokemon){
    pokemonList.style.display ="none"
    pokemonDetail.style.display ="flex"

    //----- código para obtener stats -------
let stats = " "

    for(let i=0;i<pokemon.stats.length;i++){
        stats = stats + pokemon.stats[i].base_stat + " " + pokemon.stats[i].stat.name + " <br>"
        console.log(pokemon.stats)
    }

    //----- código para obtener tipos -------
let types = " "

    for(let i=0;i<pokemon.types.length;i++){
        types = types + pokemon.types[i].type.name + " <br>"
    }
    console.log(`${pokemon.types[0].type.name}`)
    pokemonInfo.classList.add(`${pokemon.types[0].type.name}`)
    pokemonInfo.innerHTML=`
    <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} </h2>
    <p>${types}</p>
    <p>${stats}</p>
    `
    }

backToPokedexBtn.addEventListener("click",()=>{
    pokemonList.style.display ="grid"
    pokemonDetail.style.display ="none"
})

async function loadPokedex(){
    for (let i=1;i<=50; i++){
        const pokemon = await fetchPokemonData(i)
    displayPokemon(pokemon)
}
}
loadPokedex()