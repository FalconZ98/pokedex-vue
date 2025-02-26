<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-bold text-center mb-4">Pokédex</h2>

    <!-- Spinner di caricamento -->
    <div v-if="loading" class="text-center">
      <ProgressSpinner />
      <p>Caricamento Pokémon...</p>
    </div>

    <!-- Griglia Pokémon -->
    <div
        v-else-if="pokemons.length"
        class="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
      <div
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        class="w-30 h-40 border border-gray-200 rounded-lg shadow-lg bg-white flex flex-col items-center justify-center text-black cursor-pointer transition transform hover:scale-105"
        @click="$router.push({ name: 'PokemonDetail', params: { id: getPokemonId(pokemon.url) } })"
      >
        <img
          :src="getPokemonImage(pokemon.url)"
          :alt="pokemon.name"
          class="w-30 h-30"
        />
      </div>
    </div>

    <div v-else class="text-center text-red-500">
      Nessun Pokémon trovato
    </div>

    <!-- Modale per i dettagli del Pokémon -->
    <Dialog v-model:visible="showDialog" header="Dettagli Pokémon" modal>
      <template v-if="selectedPokemon">
        <h3 class="text-xl font-bold capitalize">{{ selectedPokemon.name }}</h3>
        <img :src="selectedPokemon.sprites?.front_default" class="mx-auto my-3" />
        <p><strong>Base Experience:</strong> {{ selectedPokemon.base_experience }}</p>
        <p><strong>Altezza:</strong> {{ selectedPokemon.height }}</p>
        <p><strong>Peso:</strong> {{ selectedPokemon.weight }}</p>

        <h4 class="font-semibold mt-3">Tipi:</h4>
        <ul>
          <li v-for="type in selectedPokemon.types" :key="type.type.name">
            {{ type.type.name }}
          </li>
        </ul>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';

export default {
  components: { Button, Dialog, ProgressSpinner },
  setup() {
    const pokemons = ref([]);
    const selectedPokemon = ref(null);
    const showDialog = ref(false);
    const loading = ref(true);

    // Recupera i Pokémon dalla PokeAPI
    const fetchPokemons = async () => {
      console.log('Caricamento Pokémon...');
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1250');
        if (!response.ok) throw new Error('Errore nella richiesta');
        const data = await response.json();
        pokemons.value = data.results;
        console.log('Pokémon caricati:', pokemons.value);
      } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
      } finally {
        loading.value = false;
      }
    };

    // Recupera i dettagli di un Pokémon
    const fetchDetails = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Errore nella richiesta');
        selectedPokemon.value = await response.json();
        showDialog.value = true;
      } catch (error) {
        console.error('Errore nel recupero dei dettagli:', error);
      }
    };

    // Ottieni l'immagine del Pokémon dall'URL
    const getPokemonImage = (url) => {
      if (!url) return '';
      const id = url.split('/').filter(Boolean).pop(); // Estrae l'ID dall'URL
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    };

    const getPokemonId = (url) => {
      return url.split("/").filter(Boolean).pop();
    };


    onMounted(fetchPokemons);

    return { pokemons, selectedPokemon, showDialog, fetchDetails, getPokemonImage, loading, getPokemonId };
  },
};
</script>
