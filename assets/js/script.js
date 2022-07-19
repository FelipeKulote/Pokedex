async function getPokemon() {
  const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
  const data = await resposta.json();
  console.log(data);

  data.results.forEach((item) => {
    // console.log(item);
    document.querySelector("#pokemon-list").insertAdjacentHTML(
      "beforeend",
      `
        <div class="card">
        <img class="pokemon" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png" alt="" />
        <div>
           <p class="number-pokemon">001</p>
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
