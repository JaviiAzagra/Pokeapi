const pokedex$$ = document.querySelector('#pokedex');
const ALL_POKEMONS_INFO = []; // Cuando una variable se declara en scope global para ser usada por otros, se hace en mayúsculas.
let FILTER = [];



function getAllPokemons() {
  return fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    .then((response) => response.json())
    .then((response) => response.results)
}


const getOnePokemon = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();

    const pokemon = {
      name: result.name,
      id: result.id,
      types: result.types.map((element) => element.type.name),
      image: result.sprites.front_default,
      hp: result.stats[0].base_stat,
    };
    return pokemon;
  } catch (error) {
    console.log("Error obteniendo pokemon " + url, error);
  }
};


//Mostrar el segundo typo del pokemon
const renderTypes = (type, container) => {

  const div$$ = document.createElement("div");
  div$$.classList.add("card-subtitle");

  type.forEach((type) => {

    const typename$$ = document.createElement("p");
    typename$$.setAttribute("pokemon-types", type);
    typename$$.classList.add(type);
    typename$$.textContent = type;
    
    div$$.appendChild(typename$$);
  })

  container.appendChild(div$$)
}

const renderPokemons = (pokemons) => {

  pokedex$$.innerHTML = "";

    for (const pokemon of pokemons) {

      const li$$ = document.createElement('li');
      li$$.classList.add('card');

      const id$$ = document.createElement("h3");
      id$$.classList.add("id");
      id$$.textContent = "# " + pokemon.id;
    
      const img$$ = document.createElement('img');
      img$$.src = pokemon.image;
      img$$.alt = pokemon.name;
    
      const p$$ = document.createElement('p');
      p$$.classList.add('card-title');
      p$$.textContent = pokemon.name;

      li$$.appendChild(id$$);
      li$$.appendChild(p$$);
      renderTypes(pokemon.types, li$$);
      li$$.appendChild(img$$);

      li$$.classList.add (pokemon.types[0]);

      pokedex$$.appendChild(li$$);
    };
}


//Buscador

const search = (event) => {

  const busqueda = event.target.value;
  FILTER = ALL_POKEMONS_INFO.filter((pokemon) => {

    const Name = pokemon.name.includes(busqueda);
    const Type = pokemon.types.includes(busqueda);
    const Id = pokemon.id === Number(busqueda)

    return Name || Type || Id
  });

  renderPokemons(FILTER);
  console.log(FILTER);

};

addEventListener("input", () => search(event));


//Llamando a otras funciones.
async function arrancar() {

  const allPokemons = await getAllPokemons(); 
  for(const pokemon of allPokemons) { 
    // Pido a la api la información
    const pokemonIndividualInfo = await getOnePokemon(pokemon.url);
    ALL_POKEMONS_INFO.push(pokemonIndividualInfo);
    FILTER.push(pokemonIndividualInfo);
  }

  console.log('ALL_POKEMONS_INFO', ALL_POKEMONS_INFO);

  renderPokemons(ALL_POKEMONS_INFO);

}

window.onload = arrancar;

















