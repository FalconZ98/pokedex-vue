<template>
    <div class="min-h-screen flex flex-col items-center bg-gray-200 text-black p-6">
      <h2 class="text-3xl font-bold mb-4">🏆 Gestione Squadra Pokémon</h2>
  
      <!-- Squadra Attuale -->
      <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-screen-lg text-center">
        <h3 class="text-xl font-semibold mb-3">Squadra Attuale</h3>
  
        <div class="flex flex-wrap gap-4 justify-center">
          <!-- Slot Pokémon -->
          <div 
            v-for="(pokemon, index) in team" 
            :key="index" 
            class="relative w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center group"
          >
            <img v-if="pokemon" :src="pokemon.image" class="w-20 h-20" />
            <button 
              v-if="pokemon"
              class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              @click="removePokemon(index)"
            >
              X
            </button>
          </div>
  
          <!-- Bottone Aggiungi Pokémon -->
          <button 
            v-if="team.length < 6"
            @click="showPokemonSelector = true" 
            class="w-24 h-24 bg-blue-500 text-white rounded-lg flex items-center justify-center text-3xl font-bold shadow-lg hover:bg-blue-600 transition"
          >
            +
          </button>
        </div>
      </div>
  
      <!-- Modale Selezione Pokémon -->
      <Dialog v-model:visible="showPokemonSelector" header="Seleziona un Pokémon" modal class="w-full max-w-3xl">
        <div class="flex flex-wrap gap-4 mb-4">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Cerca per nome..." 
            class="p-2 border border-gray-300 rounded w-full"
          />
          
          <Dropdown 
            v-model="selectedGeneration" 
            :options="generations" 
            optionLabel="label" 
            placeholder="Seleziona Generazione"
            class="w-full md:w-1/3"
          />
  
          <Dropdown 
            v-model="selectedType" 
            :options="types" 
            optionLabel="label" 
            placeholder="Seleziona Tipo"
            class="w-full md:w-1/3"
          />
        </div>
  
        <!-- Lista Pokémon -->
        <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div 
            v-for="pokemon in filteredPokemons" 
            :key="pokemon.id"
            class="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
            @click="selectPokemon(pokemon)"
          >
            <img :src="pokemon.image" class="w-16 h-16" />
          </div>
        </div>
      </Dialog>
  
      <!-- Salva Squadra -->
      <button 
        @click="saveTeam"
        class="mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition"
      >
        Salva Squadra
      </button>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from "vue";
  import Dialog from "primevue/dialog";
  import Dropdown from "primevue/dropdown";
  
  export default {
    components: { Dialog, Dropdown },
    setup() {
      const team = ref([]);
      const showPokemonSelector = ref(false);
      const allPokemons = ref([]);
      const searchQuery = ref("");
      const selectedGeneration = ref(null);
      const selectedType = ref(null);
  
      const generations = [
        { label: "Tutte", value: null },
        { label: "Gen 1", value: "generation-i" },
        { label: "Gen 2", value: "generation-ii" },
        { label: "Gen 3", value: "generation-iii" },
        { label: "Gen 4", value: "generation-iv" },
        { label: "Gen 5", value: "generation-v" },
        { label: "Gen 6", value: "generation-vi" },
        { label: "Gen 7", value: "generation-vii" },
        { label: "Gen 8", value: "generation-viii" },
        { label: "Gen 9", value: "generation-ix" },
      ];
  
      const types = [
        { label: "Tutti", value: null },
        { label: "Fuoco", value: "fire" },
        { label: "Acqua", value: "water" },
        { label: "Erba", value: "grass" },
        { label: "Elettro", value: "electric" },
        { label: "Psico", value: "psychic" },
        { label: "Buio", value: "dark" },
        { label: "Drago", value: "dragon" },
        { label: "Acciaio", value: "steel" },
        { label: "Normale", value: "normal" },
        { label: "Veleno", value: "poison" },
        { label: "Terra", value: "ground" },
        { label: "Volante", value: "flying" },
        { label: "Roccia", value: "rock" },
        { label: "Lotta", value: "fighting" },
        { label: "Spettro", value: "ghost" },
        { label: "Folletto", value: "fairy" },
      ];
  
      // Recupera tutti i Pokémon dalla PokeAPI
      const fetchPokemons = async () => {
        try {
          const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
          if (!response.ok) throw new Error("Errore nel recupero dei Pokémon");
          const data = await response.json();
  
          allPokemons.value = await Promise.all(
            data.results.map(async (pokemon) => {
              const res = await fetch(pokemon.url);
              const details = await res.json();
  
              return {
                id: details.id,
                name: details.name,
                image: details.sprites.front_default,
                types: details.types.map(t => t.type.name),
                generation: details.species.url.includes("generation") ? details.species.url.split("/").slice(-2, -1)[0] : "unknown"
              };
            })
          );
        } catch (error) {
          console.error("Errore nel recupero dei Pokémon:", error);
        }
      };
  
      // Filtra i Pokémon in base ai criteri di ricerca
      const filteredPokemons = computed(() => {
        return allPokemons.value.filter(pokemon => {
          return (
            (searchQuery.value === "" || pokemon.name.includes(searchQuery.value.toLowerCase())) &&
            (!selectedGeneration.value || pokemon.generation === selectedGeneration.value) &&
            (!selectedType.value || pokemon.types.includes(selectedType.value))
          );
        });
      });
  
      // Seleziona un Pokémon e lo aggiunge alla squadra
      const selectPokemon = (pokemon) => {
        if (team.value.length < 6) {
          team.value.push(pokemon);
          showPokemonSelector.value = false;
        }
      };
  
      // Rimuove un Pokémon dalla squadra
      const removePokemon = (index) => {
        team.value.splice(index, 1);
      };
  
      // Salva la squadra nel LocalStorage
      const saveTeam = () => {
        localStorage.setItem("pokemonTeam", JSON.stringify(team.value));
        alert("Squadra Salvata!");
      };
  
      onMounted(fetchPokemons);
  
      return { 
        team, 
        showPokemonSelector, 
        allPokemons, 
        searchQuery, 
        selectedGeneration, 
        selectedType, 
        generations, 
        types, 
        filteredPokemons, 
        selectPokemon, 
        removePokemon, 
        saveTeam 
      };
    },
  };
  </script>
  