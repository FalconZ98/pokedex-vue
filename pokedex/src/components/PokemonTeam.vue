<template>
    <div class="min-h-screen bg-gray-200 text-black p-6">
      <h2 class="text-2xl font-bold text-center mb-4">Gestione Squadra Pokémon</h2>
  
      <!-- Se la squadra non è stata creata, mostra la selezione -->
      <div v-if="!team.length" class="text-center">
        <p class="text-lg mb-4 text-gray-600">Non hai ancora una squadra! Seleziona fino a 6 Pokémon.</p>
        <Button label="Crea Squadra" class="p-button-success" @click="openSelection = true" />
      </div>
  
      <!-- Se la squadra è stata creata, mostra i Pokémon -->
      <div v-else class="text-center">
        <h3 class="text-xl font-semibold mb-3">La tua squadra</h3>
        <div class="flex flex-wrap justify-center gap-4">
          <div v-for="pokemon in team" :key="pokemon.id" class="p-4 bg-white shadow-lg rounded-lg flex flex-col items-center">
            <img :src="pokemon.image" :alt="pokemon.name" class="w-20 h-20" />
            <p class="capitalize font-bold">{{ pokemon.name }}</p>
          </div>
        </div>
        <Button label="Modifica Squadra" class="mt-4 p-button-warning" @click="openSelection = true" />
      </div>
  
      <!-- Modale per la selezione dei Pokémon -->
      <Dialog v-model:visible="openSelection" header="Seleziona la tua squadra" modal>
        <div class="grid grid-cols-3 gap-4">
          <div 
            v-for="pokemon in pokemons" 
            :key="pokemon.id" 
            class="p-3 border rounded-lg cursor-pointer bg-white shadow-md hover:bg-gray-100 transition"
            :class="{ 'border-green-500': isInTeam(pokemon) }"
            @click="toggleSelection(pokemon)"
          >
            <img :src="pokemon.image" :alt="pokemon.name" class="w-16 h-16 mx-auto" />
            <p class="text-center capitalize">{{ pokemon.name }}</p>
          </div>
        </div>
  
        <div class="mt-4 flex justify-center">
          <Button 
            label="Salva Squadra" 
            class="p-button-success" 
            :disabled="team.length === 0 || team.length > 6" 
            @click="saveTeam"
          />
        </div>
      </Dialog>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import Button from "primevue/button";
  import Dialog from "primevue/dialog";
  
  export default {
    components: { Button, Dialog },
    setup() {
      const team = ref([]);
      const pokemons = ref([]);
      const openSelection = ref(false);
  
      // Controlla se esiste già una squadra nel localStorage
      const loadTeam = () => {
        const savedTeam = JSON.parse(localStorage.getItem("pokemonTeam"));
        if (savedTeam) team.value = savedTeam;
      };
  
      // Recupera i Pokémon dalla PokeAPI
      const fetchPokemons = async () => {
        try {
          const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1250"); // Primi 150 Pokémon
          const data = await response.json();
          pokemons.value = data.results.map((poke, index) => ({
            id: index + 1,
            name: poke.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
          }));
        } catch (error) {
          console.error("Errore nel recupero dei Pokémon:", error);
        }
      };
  
      // Aggiunge o rimuove un Pokémon dalla squadra
      const toggleSelection = (pokemon) => {
        const index = team.value.findIndex(p => p.id === pokemon.id);
        if (index === -1 && team.value.length < 6) {
          team.value.push(pokemon);
        } else {
          team.value.splice(index, 1);
        }
      };
  
      // Controlla se un Pokémon è nella squadra
      const isInTeam = (pokemon) => {
        return team.value.some(p => p.id === pokemon.id);
      };
  
      // Salva la squadra e chiude la selezione
      const saveTeam = () => {
        localStorage.setItem("pokemonTeam", JSON.stringify(team.value));
        openSelection.value = false;
      };
  
      onMounted(() => {
        loadTeam();
        fetchPokemons();
      });
  
      return { team, pokemons, openSelection, toggleSelection, isInTeam, saveTeam };
    }
  };
  </script>
  