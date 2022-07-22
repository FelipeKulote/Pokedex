const modalName = document.querySelector("#modalName");
const modalImg = document.querySelector("#modalImg");
const modalTypes1 = document.querySelector("#modalType1");
const modalTypes2 = document.querySelector("#modalType2");
const modalDescription = document.querySelector("#modalDescription");

let page1 = 0;
// let page2 = 20;

const getPokemon = async (pokemon) => {
  const resposta = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${page1}&limit=20",`
  );
  const data = await resposta.json();
  data.results.forEach(async (item) => {
    const itemUrl = await fetch(item.url);
    const data2 = await itemUrl.json();

    const especies = await fetch(data2.species.url);
    const data3 = await especies.json();

    const evolution = await fetch(data3.evolution_chain.url);
    const data4 = await evolution.json();

    let type2 = "";
    try {
      type2 = data2.types[1].type.name;
    } catch (a) {
      type2 = "";
    }

    function pokemontype(tipo) {
      if (tipo.toLowerCase() == "bug") {
        return `<div class="card" style="background-color: #F8D5A3">`;
      } else if (tipo.toLowerCase() == "dragon") {
        return `<div class="card" style="background-color: #97B3E6">`;
      } else if (tipo.toLowerCase() == "fairy") {
        return `<div class="card" style="background-color: #FCEAFF">`;
      } else if (tipo.toLowerCase() == "fire") {
        return `<div class="card" style="background-color: #f53409">`;
      } else if (tipo.toLowerCase() == "ghost") {
        return `<div class="card" style="background-color: #B9C2C4">`;
      } else if (tipo.toLowerCase() == "ground") {
        return `<div class="card" style="background-color: #F4E7DA">`;
      } else if (tipo.toLowerCase() == "normal") {
        return `<div class="card" style="background-color: #F5F5F5">`;
      } else if (tipo.toLowerCase() == "psychic") {
        return `<div class="card" style="background-color: #EAEDA1">`;
      } else if (tipo.toLowerCase() == "steel") {
        return `<div class="card" style="background-color: #F4F4F4">`;
      } else if (tipo.toLowerCase() == "dark") {
        return `<div class="card" style="background-color: #2f082f">`;
      } else if (tipo.toLowerCase() == "electric") {
        return `<div class="card" style="background-color: #ffff00">`;
      } else if (tipo.toLowerCase() == "fighting") {
        return `<div class="card" style="background-color: #E6E0D4">`;
      } else if (tipo.toLowerCase() == "flying") {
        return `<div class="card" style="background-color: #F5F5F5">`;
      } else if (tipo.toLowerCase() == "grass") {
        return `<div class="card" style="background-color: #DEFDE0">`;
      } else if (tipo.toLowerCase() == "ice") {
        return `<div class="card" style="background-color: #DEF3FD">`;
      } else if (tipo.toLowerCase() == "poison") {
        return `<div class="card" style="background-color: #98D7A5">`;
      } else if (tipo.toLowerCase() == "rock") {
        return `<div class="card" style="background-color: #D5D5D4">`;
      } else if (tipo.toLowerCase() == "water") {
        return `<div class="card" style="background-color: #0a65ef">`;
      }
    }
    const type1 = data2.types[0].type.name;

    document.querySelector("#pokemon-list").insertAdjacentHTML(
      "beforeend",
      `
      ${pokemontype(type1)}
        <img class="img-pokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          data2.id
        }.png" alt="" />
        <div>
            <span class="number-pokemon">${data2.id}</span>
            <h2 class="name-pokemon">${data2.name}</h2>
        </div>
      </div>
      `
    );
  });

  const cards = document.querySelectorAll('#pokemon-list');
  // console.log(cards);
  
  const modal = document.querySelector('#modalOverlay');
  cards.forEach((card) =>{
    card.addEventListener("click", async function(event){
      // console.log(event);
      const cardElement = event.path.filter((item) => item.className == "card");
      // console.log(cardElement);
      const idCard = cardElement[0].children[1].children[0].innerHTML;
      // console.log(idCard);
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${idCard}`)
      const dados = await resp.json();
      console.log(dados);
      modal.style.display = 'flex'
      modalImg.setAttribute("src", dados.sprites.other["official-artwork"].front_default);
      modalName.innerText = dados.name;
      modalTypes1.innerText = dados.types[0].type.name;
      modalTypes2.innerText = dados.types[1].type.name;

      if(modalTypes2==""){
        modalTypes2.style.display = 'none';
      }
      // modalDescription.innerText = ;
      
      const resp2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idCard}`);
      const dados2 = await resp2.json();
      // console.log(dados2)
        let descricao = "";
        for (let i = 0; i < 2000; i++) {
          if (dados2.flavor_text_entries[i].language.name == "en") {
            descricao = dados2.flavor_text_entries[i].flavor_text;
            // break;
          }
        
        descricao = descricao
          .replace("", "")
          .replace("POKéMON", "Pokemon")
          .replace("POKéMON", "Pokemon")
          .replace("POKéMON", "Pokemon");

        modalDescription.innerText = descricao;
        }


    });
  });

  window.addEventListener("click", function (event){
    if(!event.target.classList.contains("modal-item")){
      modal.style.display = "none";
    }
  })
};
getPokemon();

function viewMore(){
  page1+=20;
  getPokemon();
}

// window.addEventListener("scroll", function(){
//   const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
//   if (scrollTop + clientHeight >= scrollHeight){
//     viewMore();
//   }
// })

// return `<p class="type-pokemon" style="background-color: green; color: white">BUG</p>`
{
  /* <div class="card"></div> */
}

// ${tipospokemons(tipo2)}
// ${tipospokemons(tipo)}

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



// <p class="type-pokemon">${type1}</p>
// <p class="type-pokemon">${type2}</p> 
// <h4 class="desc-pokemon">${descricao}</h4>