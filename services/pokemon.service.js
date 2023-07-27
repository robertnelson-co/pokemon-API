const Pokemon = require('../models/Pokemon')

async function databaseSeed() {
    await Pokemon.deleteMany()

    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
    const data = await response.json()


    let nextUrl = data.next
    const pokemonUrls = data.results.map(pokemon => pokemon.url)
    const promises = pokemonUrls.map((url) => processPokemon(url))
    const pokemon = await Promise.all(promises)
    await savePokemon(pokemon)

    while (nextUrl) {
        const response = await fetch(nextUrl)
        const data = await response.json()

        const pokemonUrls = data.results.map(pokemon => pokemon.url)
        const promises = pokemonUrls.map((url) => processPokemon(url))
        const pokemon = await Promise.all(promises)

        await savePokemon(pokemon)

        nextUrl = data.next
    }
}
async function processPokemon(url) {
    const response = await fetch(url)
    const data = await response.json()

    if (!data.sprites.front_default) data.sprites.front_default = undefined

    return {
        name: data.name,
        pokemonId: data.id,
        pokemonImage: data.sprites.front_default,
        height: data.height,
        weight: data.weight
    }
}
async function savePokemon(pokemon) {
    try {
        await Pokemon.insertMany(pokemon)
    } catch (error) {
        console.log('error saving pokemon to database:', error)
    }
}

module.exports = {
    databaseSeed
}