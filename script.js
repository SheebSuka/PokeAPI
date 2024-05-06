// Variables globales
const equipo = [];
const historial = [];

// Función para agregar pokémon al equipo
function agregarPokemon() {
    const pokemonInput = document.getElementById('pokemon');
    const pokemonName = pokemonInput.value.trim();
    if (pokemonName !== '') {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => response.json())
            .then(data => {
                const pokemon = {
                    name: data.name,
                    url: data.sprites.front_default,
                    base_experience: data.base_experience,
                    ability: data.abilities[0].ability.name
                };
                equipo.push(pokemon);
                mostrarEquipo();
                pokemonInput.value = '';
            })
            .catch(error => console.error('Error:', error));
    }
}

// Función para mostrar el equipo de pokémon
function mostrarEquipo() {
    const equipoLista = document.getElementById('equipo-lista');
    equipoLista.innerHTML = '';
    equipo.sort((a, b) => b.base_experience - a.base_experience).forEach(pokemon => {
        const pokemonHTML = `
      <div class="col-md-4">
        <img src="${pokemon.url}" alt="${pokemon.name}" class="img-fluid">
        <h5>${pokemon.name}</h5>
        <p>Experiencia base: ${pokemon.base_experience}</p>
        <p>Habilidad: ${pokemon.ability}</p>
      </div>
    `;
        equipoLista.innerHTML += pokemonHTML;
    });
}

// Función para resetear el equipo
function resetearEquipo() {
    equipo = [];
    mostrarEquipo();
}

// Función para mostrar el historial de equipos
function mostrarHistorial() {
    const historialLista = document.getElementById('historial-lista');
    historialLista.innerHTML = '';
    historial.forEach(equipo => {
        const equipoHTML = `
      <li class="list-group-item">
        <h5>Equipo:</h5>
        <ul>
          ${equipo.map(pokemon => `
            <li>
              <img src="${pokemon.url}" alt="${pokemon.name}" class="img-fluid" width="50">
              <span>${pokemon.name}</span>
              <span>Experiencia base: ${pokemon.base_experience}</span>
              <span>Habilidad: ${pokemon.ability}</span>
            </li>
          `).join('')}
        </ul>
      </li>
    `;
        historialLista.innerHTML += equipoHTML;
    });
}

// Función para mostrar el historial de pokémon
function mostrarHistorialPokemon() {
    const historialPokemonLista = document.getElementById('historial-pokemon-lista');
    historialPokemonLista.innerHTML = '';
    historial.forEach(equipo => {
        equipo.forEach(pokemon => {
            const pokemonHTML = `
        <li class="list-group-item">
          <img src="${pokemon.url}" alt="${pokemon.name}" class="img-fluid" width="50">
          <span>${pokemon.name}</span>
          <span>Experiencia base: ${pokemon.base_experience}</span>
          <span>Habilidad: ${pokemon.ability}</span>
        </li>
      `;
            historialPokemonLista.innerHTML += pokemonHTML;
        });
    });
}

// Event listeners
document.getElementById('agregar').addEventListener('click', agregarPokemon);
document.getElementById('reset').addEventListener('click', resetearEquipo);
document.getElementById('historial').addEventListener('click', () => {
    historial.push([...equipo]);
    mostrarHistorialPokemon();
    mostrarHistorial();
    $('#historial-modal').modal('show');
});