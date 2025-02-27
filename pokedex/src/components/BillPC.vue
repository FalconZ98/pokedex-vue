<template>
    <div class="min-h-screen flex flex-col items-center bg-gray-200 text-black p-6">
      <h2 class="text-3xl font-bold mb-6">🖥️ PC di Bill</h2>
  
      <!-- Sezione Pokémon -->
      <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h3 class="text-xl font-semibold mb-4">Pokémon Depositati</h3>
  
        <!-- Lista Pokémon nel PC -->
        <div v-if="pcStorage.length" class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div 
            v-for="(pokemon, index) in pcStorage" 
            :key="index"
            class="relative w-24 h-24 bg-gray-100 rounded-lg flex flex-col items-center justify-center shadow-md group"
          >
            <img :src="pokemon.image" class="w-16 h-16" />
            <p class="text-xs font-semibold capitalize mt-1">{{ pokemon.name }}</p>
  
            <button 
              class="absolute top-0 right-0 bg-blue-500 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              @click="withdrawPokemon(index)"
            >
              ⬆️
            </button>
          </div>
        </div>
  
        <!-- Messaggio se il PC è vuoto -->
        <div v-else class="text-center text-red-500 mt-4">
          Nessun Pokémon nel PC.
        </div>
      </div>
  
      <!-- Sezione Deposito -->
      <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mt-6">
        <h3 class="text-xl font-semibold mb-4">🎒 Squadra</h3>
  
        <!-- Lista Pokémon nella squadra -->
        <div class="grid grid-cols-3 gap-4">
          <div 
            v-for="(pokemon, index) in team" 
            :key="index"
            class="relative w-24 h-24 bg-gray-100 rounded-lg flex flex-col items-center justify-center shadow-md group"
          >
            <img :src="pokemon.image" class="w-16 h-16" />
            <p class="text-xs font-semibold capitalize mt-1">{{ pokemon.name }}</p>
  
            <button 
              class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              @click="depositPokemon(index)"
            >
              ⬇️
            </button>
          </div>
        </div>
  
        <!-- Messaggio se la squadra è vuota -->
        <div v-if="team.length === 0" class="text-center text-red-500 mt-4">
          Nessun Pokémon in squadra.
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  
  export default {
    setup() {
      const pcStorage = ref([]);
      const team = ref([]);
  
      // Carica dati dal LocalStorage
      onMounted(() => {
        const savedPC = localStorage.getItem("pcStorage");
        if (savedPC) pcStorage.value = JSON.parse(savedPC);
  
        const savedTeam = localStorage.getItem("trainerTeam");
        if (savedTeam) team.value = JSON.parse(savedTeam);
      });
  
      // Deposita un Pokémon nel PC
      const depositPokemon = (index) => {
        if (team.value.length > 1) {
          const pokemon = team.value.splice(index, 1)[0];
          pcStorage.value.push(pokemon);
          saveData();
        } else {
          alert("Devi avere almeno un Pokémon nella squadra!");
        }
      };
  
      // Ritira un Pokémon nella squadra
      const withdrawPokemon = (index) => {
        if (team.value.length < 6) {
          const pokemon = pcStorage.value.splice(index, 1)[0];
          team.value.push(pokemon);
          saveData();
        } else {
          alert("Puoi avere al massimo 6 Pokémon in squadra!");
        }
      };
  
      // Salva i dati nel LocalStorage
      const saveData = () => {
        localStorage.setItem("pcStorage", JSON.stringify(pcStorage.value));
        localStorage.setItem("trainerTeam", JSON.stringify(team.value));
      };
  
      return { pcStorage, team, depositPokemon, withdrawPokemon };
    },
  };
  </script>
  
  <style scoped>
  .pokemon-card {
    @apply bg-white shadow-lg rounded-lg p-6 flex flex-col items-center;
  }
  </style>
  