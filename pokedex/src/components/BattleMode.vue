<template>
    <div class="min-h-screen flex flex-col items-center bg-gray-200 text-black p-6">
      <h2 class="text-3xl font-bold mb-6">⚔️ Modalità Battaglia</h2>
  
      <!-- Contenitore della lotta -->
      <div class="battle-container">
        <!-- Pokémon dell'allenatore -->
        <div class="pokemon-card trainer-pokemon">
          <h3 class="text-xl font-bold text-center">🔥 La tua Squadra</h3>
          <div class="flex flex-wrap justify-center gap-4">
            <div 
              v-for="(pokemon, index) in team" 
              :key="index"
              class="pokemon-choice"
              @click="selectPokemon(pokemon)"
            >
              <img :src="pokemon.image" class="w-20 h-20" />
              <p class="capitalize text-center">{{ pokemon.name }}</p>
            </div>
          </div>
        </div>
  
        <!-- Pokémon Selvatico -->
        <div class="pokemon-card enemy-pokemon" v-if="wildPokemon">
          <h3 class="text-xl font-bold text-center">🌲 Pokémon Selvatico</h3>
          <img :src="wildPokemon.image" class="w-24 mx-auto">
          <p class="capitalize text-center">{{ wildPokemon.name }}</p>
          <p class="text-center">❤️ HP: {{ wildPokemon.hp }}</p>
        </div>
      </div>
  
      <!-- Pulsanti di azione -->
      <div v-if="selectedPokemon && wildPokemon" class="battle-actions mt-6">
        <button @click="attack" class="battle-button bg-red-500">⚡ Attacco</button>
        <button @click="throwPokeball" class="battle-button bg-blue-500">🎾 Lancia Pokéball</button>
        <button @click="runAway" class="battle-button bg-gray-500">🏃‍♂️ Fuggi</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  
  export default {
    setup() {
      const team = ref([
        { name: "charizard", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png", hp: 100 },
        { name: "pikachu", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", hp: 80 },
        { name: "blastoise", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png", hp: 120 }
      ]);
  
      const selectedPokemon = ref(null);
      const wildPokemon = ref(null);
  
      // Seleziona un Pokémon dalla squadra
      const selectPokemon = (pokemon) => {
        selectedPokemon.value = { ...pokemon };
      };
  
      // Genera un Pokémon selvatico casuale
      const generateWildPokemon = async () => {
        const randomId = Math.floor(Math.random() * 151) + 1; // Primo 151 Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();
        wildPokemon.value = {
          name: data.name,
          image: data.sprites.front_default,
          hp: Math.floor(Math.random() * 100) + 50,
        };
      };
  
      // Attacco Pokémon
      const attack = () => {
        if (wildPokemon.value) {
          wildPokemon.value.hp -= Math.floor(Math.random() * 20) + 10;
          if (wildPokemon.value.hp <= 0) {
            alert(`${wildPokemon.value.name} è stato sconfitto!`);
            generateWildPokemon();
          }
        }
      };
  
      // Cattura Pokémon
      const throwPokeball = () => {
        const chance = Math.random();
        if (chance > 0.5) {
          alert(`Hai catturato ${wildPokemon.value.name}!`);
          team.value.push(wildPokemon.value);
          generateWildPokemon();
        } else {
          alert(`${wildPokemon.value.name} è sfuggito!`);
        }
      };
  
      // Fuggi dalla lotta
      const runAway = () => {
        alert("Sei fuggito dalla lotta!");
        generateWildPokemon();
      };
  
      onMounted(generateWildPokemon);
  
      return { team, selectedPokemon, wildPokemon, selectPokemon, attack, throwPokeball, runAway };
    },
  };
  </script>
  
  <style scoped>
  .battle-container {
    @apply flex flex-col md:flex-row gap-6 justify-center;
  }
  
  .pokemon-card {
    @apply bg-white shadow-lg rounded-lg p-6 flex flex-col items-center;
  }
  
  .pokemon-choice {
    @apply cursor-pointer hover:scale-105 transition transform duration-200;
  }
  
  .battle-actions {
    @apply flex gap-4;
  }
  
  .battle-button {
    @apply px-6 py-3 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition transform duration-200;
  }
  </style>
  