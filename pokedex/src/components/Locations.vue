<template>
    <div class="flex flex-col bg-gray-200 text-black p-6">
      <h2 class="text-2xl font-bold text-center mb-4">Lista Location Pokémon</h2>
  
      <!-- Spinner di caricamento -->
      <div v-if="loading" class="text-center flex flex-col items-center">
        <img src="https://media.tenor.com/Hg2Mb_mQdhYAAAAi/pokemon-pokeball.gif" alt="Loading" class="w-50 h-24" />
        <p>Caricamento ...</p>
      </div>

      <!-- Filtro per regione -->
      <div v-if="!loading" class="mb-4">
        <Dropdown 
          v-model="selectedRegion" 
          :options="regions" 
          optionLabel="name" 
          placeholder="Seleziona una Regione"
          class="w-full md:w-60"
          @change="filterLocations"
        />
      </div>
  
      <!-- Tabella Location -->
      <DataTable v-if="!loading && paginatedLocations.length" :value="paginatedLocations" class="p-datatable-sm shadow-lg">
        <Column field="name" header="Nome Location">
          <template #body="{ data }">
            <span class="capitalize">{{ data.name.replace(/-/g, " ") }}</span>
          </template>
        </Column>
        <Column field="region" header="Regione">
          <template #body="{ data }">
            <span class="capitalize">{{ data.region }}</span>
          </template>
        </Column>
      </DataTable>

      <!-- Paginazione -->
      <Paginator 
        v-if="!loading && filteredLocations.length > rowsPerPage" 
        :rows="rowsPerPage" 
        :totalRecords="filteredLocations.length" 
        class="mt-4 shadow-md"
        @page="onPageChange"
      />

      <!-- Messaggio se non ci sono location disponibili -->
      <div v-if="!loading && filteredLocations.length === 0" class="text-center text-red-500 mt-4">
        Nessuna location trovata per questa regione.
      </div>
    </div>
</template>
  
<script>
import { ref, onMounted, computed, watch } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ProgressSpinner from "primevue/progressspinner";
import Dropdown from "primevue/dropdown";
import Paginator from "primevue/paginator";
import { useRoute } from "vue-router";

export default {
  components: { DataTable, Column, ProgressSpinner, Dropdown, Paginator },
  setup() {
    const locations = ref([]);
    const filteredLocations = ref([]);
    const regions = ref([]);
    const selectedRegion = ref(null);
    const loading = ref(true);
    const route = useRoute();

    // Variabili per la paginazione
    const currentPage = ref(0);
    const rowsPerPage = ref(16); // Mostra 20 location per pagina

    // Filtra le location da mostrare per pagina
    const paginatedLocations = computed(() => {
      const start = currentPage.value * rowsPerPage.value;
      const end = start + rowsPerPage.value;
      return filteredLocations.value.slice(start, end);
    });

    // Recupera tutte le location
    const fetchLocations = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/location?limit=1000");
            if (!response.ok) throw new Error("Errore nel recupero delle location");
            const data = await response.json();

            // Ottieni dettagli per ogni location
            const detailedLocations = await Promise.all(
            data.results.map(async (location) => {
                const res = await fetch(location.url);
                const locationData = await res.json();
                return {
                  name: locationData.name,
                  region: locationData.region ? locationData.region.name : "Sconosciuta",
                };
            })
            );

            console.log("Locations caricate:", detailedLocations.length);

            locations.value = detailedLocations;
            filteredLocations.value = detailedLocations;
        } catch (error) {
            console.error("Errore nel recupero delle location:", error);
        } finally {
            loading.value = false;
        }
    };

    // Recupera le regioni per il filtro
    const fetchRegions = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/region/");
        if (!response.ok) throw new Error("Errore nel recupero delle regioni");
        const data = await response.json();
        regions.value = [{ name: "Tutte", id: "all" }, ...data.results.map(region => ({
          name: region.name,
          id: region.url.split("/").filter(Boolean).pop(),
        }))];

        // Se l'utente arriva dalla pagina delle regioni, imposta subito il filtro
        if (route.query.region) {
          selectedRegion.value = regions.value.find(r => r.name === route.query.region);
          filterLocations();
        }
      } catch (error) {
        console.error("Errore nel recupero delle regioni:", error);
      }
    };

    // Filtra le location in base alla regione selezionata
    const filterLocations = () => {
      currentPage.value = 0; // Resetta la paginazione
      if (!selectedRegion.value || selectedRegion.value.id === "all") {
        filteredLocations.value = locations.value;
      } else {
        filteredLocations.value = locations.value.filter(loc => loc.region === selectedRegion.value.name);
      }
    };

    // Cambia pagina nel paginator
    const onPageChange = (event) => {
      currentPage.value = event.page;
    };

    onMounted(() => {
      fetchLocations();
      fetchRegions();
    });

    // Rileva cambiamenti nella selezione della regione
    watch(selectedRegion, filterLocations);

    return { 
      locations, 
      filteredLocations, 
      regions, 
      selectedRegion, 
      filterLocations, 
      loading, 
      paginatedLocations, 
      currentPage, 
      rowsPerPage, 
      onPageChange 
    };
  },
};
</script>
