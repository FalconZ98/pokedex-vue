<template>
    <div class="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <h2 v-if="pokemon" class="text-3xl font-bold mb-4 capitalize">{{ pokemon.name }}</h2>
  
      <div v-if="loading" class="text-center">
        <ProgressSpinner />
        <p>Caricamento Pokémon...</p>
      </div>
  
      <div v-else-if="pokemon" class="p-6 bg-white text-black rounded-lg shadow-lg max-w-md">
        <img :src="pokemon.sprites?.front_default" class="mx-auto my-3 w-32 h-32" />
        <p><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>
        <p><strong>Height:</strong> {{ pokemon.height }}</p>
        <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
  
        <h4 class="font-semibold mt-3">Tipi:</h4>
        <ul> 
          <li v-for="type in pokemon.types" :key="type.type.name">
            {{ type.type.name }}
          </li>
        </ul>
  
        <!-- SEZIONE EVOLUZIONI -->
        <div v-if="evolutions.length" class="mt-6">
          <h3 class="text-xl font-bold text-center mb-3">Evolutions</h3>
          <div class="flex justify-center gap-4">
            <div
              v-for="evolution in evolutions"
              :key="evolution.id"
              class="cursor-pointer text-center"
              @click="$router.push({ name: 'PokemonDetail', params: { id: evolution.id } })"
            >
              <img :src="getPokemonImage(evolution.id)" :alt="evolution.name" class="w-20 h-20 mx-auto" />
              <p class="capitalize font-semibold mt-2">{{ evolution.name }}</p>
            </div>
          </div>
        </div>
  
        <router-link to="/" class="block mt-4 text-center bg-blue-500 text-white py-2 px-4 rounded-lg">
          Torna al Pokédex
        </router-link>
      </div>
  
      <div v-else class="text-center text-red-500">
        Pokémon non trovato
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from "vue";
  import { useRoute } from "vue-router";
  import ProgressSpinner from "primevue/progressspinner";
  
  export default {
    components: { ProgressSpinner },
    setup() {
      console.log("setup");
      const route = useRoute();
      const pokemon = ref(null);
      const loading = ref(true);
      const evolutions = ref([]);
  
      // Funzione per ottenere i dettagli del Pokémon
      const fetchPokemonDetails = async () => {
        console.log("fetchPokemonDetails");
        loading.value = true;
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`);
          if (!response.ok) throw new Error("Errore nel recupero dei dettagli");
          pokemon.value = await response.json();
  
          // Dopo aver ottenuto il Pokémon, ottieni le evoluzioni
          fetchEvolutionChain(pokemon.value.species.url);
        } catch (error) {
          console.error("Errore nel recupero dei dettagli:", error);
        } finally {
          loading.value = false;
        }
      };
  
      // Funzione per ottenere la catena evolutiva
      const fetchEvolutionChain = async (speciesUrl) => {
        try {
          const response = await fetch(speciesUrl);
          if (!response.ok) throw new Error("Errore nel recupero delle specie");
          const speciesData = await response.json();
  
          const evolutionResponse = await fetch(speciesData.evolution_chain.url);
          if (!evolutionResponse.ok) throw new Error("Errore nel recupero della catena evolutiva");
          const evolutionData = await evolutionResponse.json();
  
          evolutions.value = extractEvolutions(evolutionData.chain);
        } catch (error) {
          console.error("Errore nel recupero delle evoluzioni:", error);
        }
      };
  
      // Funzione per estrarre le evoluzioni dalla catena evolutiva
      const extractEvolutions = (chain) => {
        let evolList = [];
        let current = chain;
  
        while (current) {
          const pokeName = current.species.name;
          const pokeId = current.species.url.split("/").filter(Boolean).pop();
  
          evolList.push({ name: pokeName, id: pokeId });
  
          if (current.evolves_to.length > 0) {
            current = current.evolves_to[0];
          } else {
            break;
          }
        }
  
        return evolList;
      };
  
      // Funzione per ottenere l'immagine del Pokémon
      const getPokemonImage = (id) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      };
  
      onMounted(fetchPokemonDetails);
  
      // Se cambia l'ID del Pokémon (ad es. dopo il click su un'evoluzione), ricarica i dettagli
      watch(() => route.params.id, fetchPokemonDetails);
  
      return { pokemon, loading, evolutions, getPokemonImage };
    },
  };
  </script>
  