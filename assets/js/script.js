const getPokemon = async (pokemon) => {
  const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
  const data = await resposta.json();
  // console.log(data);

  data.results.forEach(async (item) => {
    // console.log(item);
    const itemUrl = await fetch(item.url);
    const data2 = await itemUrl.json();
    // console.log(data2);
    let tipo = "";
    try{
      tipo = data2.types[1].type.name
    } catch(a) {
      tipo = ""
    }

    const especies = await fetch(data2.species.url);
    const data3 = await especies.json();
    // console.log(data3);

    const evolution = await fetch(data3.evolution_chain.url)
    const data4 = await evolution.json();
    console.log(data4);

    let descricao = ""
    for(let i = 0; i < 200; i++){
      if(data3.flavor_text_entries[i].language.name == 'en'){
        descricao = data3.flavor_text_entries[i].flavor_text;
        break;
      } 
    }
    descricao = descricao.replace('', '').replace('POKéMON', 'Pokemon').replace('POKéMON', 'Pokemon').replace('POKéMON', 'Pokemon');

    function tipospokemons(tipo){
      if(tipo.toLowerCase() == 'bug'){
        return `<p class="type-pokemon" style="background-color: green; color: white">BUG</p>`
      }
    }
    const tipo2 = data2.types[0].type.name

    document.querySelector("#pokemon-list").insertAdjacentHTML(
          "beforeend",
          `
            <div class="card">
            <img class="img-pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data2.id}.png" alt="" />
            <div>
               <p class="number-pokemon">${data2.id}</p>
               <h2 class="name-pokemon">${data2.name}</h2>
               ${tipospokemons(tipo2)}
               ${tipospokemons(tipo)}
               <h3 class="desc-pokemon">${descricao}</h3>
            </div>
          </div>
            `
        );
      });  
    }
getPokemon();





/* <p class="type-pokemon">${data2.types[0].type.name}</p>
<p class="type-pokemon">${tipo}</p> */



/* 2º jeito 
const pokemonName = document.querySelector('.name-pokemon')
const pokemonID = document.querySelector('.number-pokemon')
const pokemonType = document.querySelector('.type-pokemon')
const pokemonImg = document.querySelector('.img-pokemon')


const renderPokemon = async (pokemon) => {
    const data = await getPokemon(pokemon);

    pokemonName.innerHTML = data.name;
    pokemonID.innerHTML = data.id;
    pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    // pokemonType.innerHTML = data.type;
}
*/
