// Función para obtener un número aleatorio entre 1 y 151 (la cantidad de Pokémon en la PokeAPI)
function obtenerNumeroAleatorio() {
    return Math.floor(Math.random() * 151) + 1;
}

// Función para obtener un Pokémon aleatorio y mostrarlo en la página
async function obtenerPokemon() {
    const numeroPokemon = obtenerNumeroAleatorio();
    const url = `https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Obtener el color asociado al primer tipo del Pokémon
        const tipoPokemon = data.types[0].type.name;
        const colorTipo = await obtenerColorTipo(tipoPokemon);

        // Construir la carta del Pokémon con el color asociado al tipo
        const pokemonCard = document.getElementById('pokemonCard');
        pokemonCard.innerHTML = `
            <div class="card" style="background-color: ${colorTipo};">
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <h2>${(data.name).charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <p>ID: ${data.id}</p>
                <p>Altura: ${data.height/10}m</p>
                <p>Peso: ${data.weight/100}g</p>
                <p>Tipo: ${data.types.map(type => type.type.name).join(', ')}</p>
            </div>
        `;
    } catch (error) {
        console.error('Error al obtener el Pokémon:', error);
    }
}

// Función para obtener el color asociado a un tipo de Pokémon desde la PokeAPI
async function obtenerColorTipo(tipo) {
    // Mapear tipos a colores específicos
    const coloresTipo = {
        veneno: '#9b69da',   
        grass: '#4caf50',   
        fire: '#ff9800',    
        electric: '#ffeb3b', 
        water: '#2196f3',     
        normal: '#d3d3d3',   
        drago: '#ffd700',   
        psychic: '#795548',  
        fighting: '#d3d3d3',
        rock: '#d2b48c',
        bug: '#03a9f4',
        ice: '#00bcd4',
    };

    // Devolver el color asociado al tipo o el color predeterminado si no se encuentra
    return coloresTipo[tipo] || '#f8d030'; // Color amarillo como predeterminado
}

// Llamar a obtenerPokemon al cargar la página
document.addEventListener('DOMContentLoaded', obtenerPokemon);