// Variables globales
let equipo = [];
const historial = [];

// Función para agregar pokémon al equipo
function agregarPokemon() {
  const pokemonInput = document.getElementById('pokemon');
  const pokemonName = pokemonInput.value.trim();

  if (equipo.length === 3) {
    alert('Ya has introducido tres Pokémon.');
    pokemonInput.disabled = true; // Bloquear la caja de texto si ya hay tres Pokémon
    return;
  }

  if (pokemonName === '') {
    alert('Favor de llenar el campo');
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud HTTP');
      }
      return response.json();
    })
    .then(data => {
      const pokemon = {
        name: data.name,
        url: data.sprites.front_default,
        base_experience: data.base_experience,
        ability: data.abilities[0].ability.name,
        id: data.id
      };
      equipo.push(pokemon);
      mostrarEquipo();
      if (equipo.length === 3) {
        pokemonInput.disabled = true; // Bloquear la caja de texto si ya hay tres Pokémon
      }
      pokemonInput.value = '';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Ha ocurrido un error. Por favor, verifica tu conexión a internet y vuelve a intentarlo.');
    });
}

// Función para mostrar el equipo de pokémon
function mostrarEquipo() {
  const equipoLista = document.getElementById('equipo-lista');
  equipoLista.innerHTML = '';
  equipo.sort((a, b) => b.base_experience - a.base_experience).forEach(pokemon => {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.className = 'col-md-4';
    const pokemonHTML = `
      <img src="${pokemon.url}" alt="${pokemon.name}" class="img-fluid">
      <h5>${pokemon.name}</h5>
      <p>ID: ${pokemon.id}</p>
      <p>Experiencia base: ${pokemon.base_experience}</p>
      <p>Habilidad: ${pokemon.ability}</p>
    `;
    pokemonDiv.innerHTML = pokemonHTML;
    equipoLista.appendChild(pokemonDiv);
  });
}

// Función para resetear el equipo
function resetearEquipo() {
  equipo = [];
  mostrarEquipo();
  document.getElementById('pokemon').disabled = false; // Habilitar la caja de texto cuando se resetee el equipo
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
              <span>ID: ${pokemon.id}</span>
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
          <span>ID: ${pokemon.id}</span>
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
document.getElementById('reset').addEventListener('click', () => {
  if (equipo.length === 0) {
    alert('No hay nada que resetear');
    return;
  }
  resetearEquipo();
});
document.getElementById('historial').addEventListener('click', () => {
  if (equipo.length === 0) {
    alert('No hay nada que agregar al historial');
    return;
  }
  historial.push([...equipo]);
  mostrarHistorialPokemon();
  mostrarHistorial();
  $('#historial-modal').modal('show');
});
