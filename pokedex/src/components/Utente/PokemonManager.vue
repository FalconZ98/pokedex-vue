<template>
    <div class="mt-6 bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl text-center">
      <h3 class="text-xl font-semibold">Squadra Pokémon</h3>
  
      <!-- Mostra i Pokémon della squadra -->
      <div class="flex flex-wrap gap-4 justify-center mt-4">
        <div 
          v-for="(pokemon, index) in team" 
          :key="index" 
          class="relative w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center group overflow-visible"
        >
          <img :src="pokemon.image" class="w-16 h-16" />
          <button 
            class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            @click="removePokemon(index)"
            >
            X
            </button>
        </div>
      </div>
  
      <button 
        v-if="team.length < 6"
        @click="openPokemonSelection"
        class="mt-4 px-4 py-2 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition"
      >
        Aggiungi Pokémon
      </button>
  
      <!-- Modale di selezione Pokémon -->
      <Dialog v-model:visible="showSelection" header="Seleziona Pokémon" modal>
        <div class="grid grid-cols-3 gap-4">
          <div 
            v-for="pokemon in pokemons" 
            :key="pokemon.id" 
            class="cursor-pointer text-center border p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            @click="addPokemon(pokemon)"
          >
            <img :src="pokemon.image" class="w-16 h-16 mx-auto" />
            <p class="capitalize">{{ pokemon.name }}</p>
          </div>
        </div>
      </Dialog>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import Dialog from "primevue/dialog";
  
  export default {
    components: { Dialog },
    props: {
      team: Array,
    },
    emits: ["updateTeam"],
    setup(props, { emit }) {
      const pokemons = ref([]);
      const showSelection = ref(false);
  
      // Carica i Pokémon
      const fetchPokemons = async () => {
        try {
          const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
          const data = await response.json();
          pokemons.value = data.results.map((p, index) => ({
            id: index + 1,
            name: p.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          }));
        } catch (error) {
          console.error("Errore nel recupero dei Pokémon:", error);
        }
      };
  
      // Apre la selezione Pokémon
      const openPokemonSelection = () => {
        showSelection.value = true;
      };
  
      // Aggiunge un Pokémon alla squadra
      const addPokemon = (pokemon) => {
        if (props.team.length < 6) {
          emit("updateTeam", [...props.team, pokemon]);
          showSelection.value = false;
        }
      };
  
      // Rimuove un Pokémon
      const removePokemon = (index) => {
        const newTeam = [...props.team];
        newTeam.splice(index, 1);
        emit("updateTeam", newTeam);
      };
  
      onMounted(fetchPokemons);
  
      return { pokemons, showSelection, openPokemonSelection, addPokemon, removePokemon };
    },
  };
  </script>
  