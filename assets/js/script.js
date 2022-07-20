const getPokemon = async (pokemon) => {
  const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
  const data = await resposta.json();
//   console.log(data);

  data.results.forEach((item) => {
    // console.log(item);
    document.querySelector("#pokemon-list").insertAdjacentHTML(
          "beforeend",
          `
            <div class="card">
            <img class="img-pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="" />
            <div>
               <p class="number-pokemon">${item.id}</p>
               <h2 class="name-pokemon">${item.name}</h2>
               <p class="type-pokemon">Grass</p>
            </div>
          </div>
            `
        );
      });  
    }
getPokemon();








// pokemon.id
// pokemon.types




// data.results.forEach((item) => {
//     // console.log(item);
//     


/* 2º jeito 
const pokemonName = document.querySelector('.name-pokemon')
const pokemonID = document.querySelector('.number-pokemon')
const pokemonType = document.querySelector('.type-pokemon')
const pokemonImg = document.querySelector('.img-pokemon')


const renderPokemon = async (pokemon) => {
    const data = await getPokemon(pokemon);

    pokemonName.innerHTML = data.name;
    pokemonID.innerHTML = data.id;
    pokemonImg.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${data.id}.png`;
    // pokemonType.innerHTML = data.type;
}
*/
