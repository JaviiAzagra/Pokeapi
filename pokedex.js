const pokedex$$ = document.querySelector('#pokedex');
const ALL_POKEMONS_INFO = []; // Cuando una variable se declara en scope global para ser usada por otros, se hace en mayúsculas.
let FILTERED_POKEMONS = [];

function getAllPokemons() {
  return fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((error) => console.log("Error obteniendo todos los pokemos", error));
}
/* function getOnePokemon(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => console.log("Error obteniendo pokemon individual", error));
} */

const getOnePokemon = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();

    const pokemon = {
      name: result.name,
      id: result.id,
      types: result.types.map((element) => element.type.name),
      image: result.sprites.front_default,
    };

    return pokemon;
  } catch (error) {
    console.log("Error obteniendo pokemon " + url, error);
  }
};

const input$$ = document.createElement("input");
input$$.classList.add("search_input");
const container$$ = document.querySelector(".container");
const box$$ = document.createElement("div");
box$$.classList.add("box");
container$$.insertBefore(box$$, pokedex$$);

const renderSearch = (pokemons) => {
  const divFinder$$ = document.createElement("div");
  const p$$ = document.createElement("p");

  input$$.setAttribute("type", "text");
  input$$.placeholder = "Búsqueda por Nombre, ID y tipo";
  divFinder$$.appendChild(p$$);
  divFinder$$.appendChild(input$$);

  box$$.appendChild(divFinder$$);
};

const search = (event) => {
  const busqueda = event.target.value;
  FILTERED_POKEMONS = ALL_POKEMONS_INFO.filter((poke) => {
    const Name = poke.name.includes(busqueda);
    const Type = poke.types.includes(busqueda);
    const Id = poke.id === Number(busqueda)
    return Name || Type || Id
  });
  renderPokemons(FILTERED_POKEMONS);
};


//Mostrar el segundo typo del pokemon
const renderTypes = (type, container) => {
  const div$$ = document.createElement("div");
  div$$.classList.add("card-subtitle");

  type.forEach(type => {
    const typeSpan$$ = document.createElement("p");
    typeSpan$$.setAttribute("pokemon-types", type);
    typeSpan$$.classList.add(type);
    typeSpan$$.textContent = type;
    div$$.appendChild(typeSpan$$);
  })

  container.appendChild(div$$)
}

const renderPokemons = (pokemons) => {
  pokedex$$.innerHTML = "";
    for (const poke of pokemons) {
      const li$$ = document.createElement('li');
      li$$.classList.add('card');

      const id$$ = document.createElement("h3");
      id$$.classList.add("id");
      id$$.textContent = "# " + poke.id;
    
      const img$$ = document.createElement('img');
      img$$.src = poke.image;
      img$$.alt = poke.name;
    
      const p$$ = document.createElement('p');
      p$$.classList.add('card-title');
      p$$.textContent = poke.name;

      li$$.appendChild(id$$);
      li$$.appendChild(p$$);
      renderTypes(poke.types, li$$);
      li$$.appendChild(img$$);
      li$$.classList.add (poke.types[0]);

      pokedex$$.appendChild(li$$);
    };
}


// Director de orquesta: irá llamando a otras funciones.
async function arrancar() {
  console.log('Ejecuntando peticiones pokedex...');

  const allPokemons = await getAllPokemons(); // array de objetos con name y url por cada pokemon
  
  // Itero por el array de pokemons, llamo a getOnePokemon una vez
  // por cada pokemon, pasándole la url de cada pokemon.
  for(const pokemon of allPokemons) { 
    // Pido a la api la información de cada pokemon individual y la guardo en una variable
    const pokemonIndividualInfo = await getOnePokemon(pokemon.url);
    ALL_POKEMONS_INFO.push(pokemonIndividualInfo);
    FILTERED_POKEMONS.push(pokemonIndividualInfo);
  }

  console.log('ALL_POKEMONS_INFO', ALL_POKEMONS_INFO);

  renderPokemons(ALL_POKEMONS_INFO);
  renderSearch(ALL_POKEMONS_INFO);

  input$$.addEventListener("input", () => search(event));
}

window.onload = arrancar;
