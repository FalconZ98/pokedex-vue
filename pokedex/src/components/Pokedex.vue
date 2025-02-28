<template>
  <div class="flex flex-col bg-gray-200 text-black p-6">
    <!-- Spinner di caricamento -->
    <h3 class="text-center font-bold">Seleziona un pokémon per vederne i dettagli!</h3>
    <div v-if="loading" class="text-center flex flex-col items-center">
        <img src="https://media.tenor.com/Hg2Mb_mQdhYAAAAi/pokemon-pokeball.gif" alt="Loading" class="w-50 h-24" />
        <p>Caricamento Pokémon...</p>
    </div>

    <!-- Griglia Pokémon -->
    <div
        v-else-if="paginatedPokemons.length"
        class="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-2"
      >
      <div
        v-for="pokemon in paginatedPokemons"
        :key="pokemon.name"
        id="pokemon"
        class="w-30 h-40 border border-gray-200 rounded-lg shadow-xl bg-white flex flex-col items-center justify-center text-black transition transform hover:scale-105"
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

    <!-- Paginator -->
    <Paginator 
      v-if="pokemons.length" 
      :rows="rowsPerPage" 
      :totalRecords="pokemons.length" 
      class="mt-6 shadow-2xl mb-0"
      @page="onPageChange">
    </Paginator>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import Paginator from 'primevue/paginator';
import Breadcrumb from 'primevue/breadcrumb';

export default {
  components: { Button, Dialog, ProgressSpinner, Paginator },
  setup() {
    const pokemons = ref([]);
    const selectedPokemon = ref(null);
    const showDialog = ref(false);
    const loading = ref(true);
    
    // Paginazione
    const currentPage = ref(0);
    const rowsPerPage = 24;

    // Filtra i Pokémon in base alla pagina corrente
    const paginatedPokemons = computed(() => {
      const start = currentPage.value * rowsPerPage;
      const end = start + rowsPerPage;
      return pokemons.value.slice(start, end);
    });

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
      const id = url.split('/').filter(Boolean).pop();
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    };

    const getPokemonId = (url) => {
      return url.split("/").filter(Boolean).pop();
    };

    // Cambia pagina nel paginator
    const onPageChange = (event) => {
      currentPage.value = event.page;
    };

    onMounted(fetchPokemons);

    return { 
      pokemons, 
      paginatedPokemons, 
      selectedPokemon, 
      showDialog, 
      fetchDetails, 
      getPokemonImage, 
      loading, 
      getPokemonId, 
      currentPage, 
      rowsPerPage, 
      onPageChange 
    };
  },
};
</script>
