let id = '';

function catchPokemon() {
    randomPokemon();
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    fetch(url)
    .then (response => response.json())
    .then (data => {   
        
    const namePokemon = data.name;
    document.getElementById("capturado").innerHTML = "Has capturado un: ";
    document.getElementById('pokemonSprite').src = data.sprites.front_default;
    document.getElementById('pokemonName').innerHTML = data.name;
    document.getElementById("id").innerHTML = "# " + data.id;
    })
    
}

function randomPokemon(){
    id = Math.round(Math.random() * 905) + 1;
}