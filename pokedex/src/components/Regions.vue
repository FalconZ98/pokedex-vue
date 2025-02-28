<template>
    <div class="flex flex-col bg-gray-200 text-black p-6">
  
      <h2 class="text-2xl font-bold text-center mb-4">Regioni Pokémon</h2>
  
      <!-- Spinner di caricamento -->
      <div v-if="loading" class="text-center flex flex-col items-center">
        <img src="https://media.tenor.com/Hg2Mb_mQdhYAAAAi/pokemon-pokeball.gif" alt="Loading" class="w-50 h-24" />
        <p>Caricamento ...</p>
      </div>
  
      <!-- Tabella -->
      <DataTable v-else :value="regions" class="p-datatable-sm shadow-lg">
        <Column field="name" header="Nome Regione">
          <template #body="{ data }">
            <span class="capitalize">{{ data?.name }}</span>
          </template>
        </Column>
        <Column field="locations" header="Numero di Località">
          <template #body="{ data }">
            {{ data?.locations.length }}
          </template>
        </Column>
        <Column field="main_generation" header="Generazione Principale">
          <template #body="{ data }">
            {{ data?.main_generation }}
          </template>
        </Column>
        <Column field="version_groups" header="Versioni Correlate">
          <template #body="{ data }">
            {{ data?.version_groups.join(", ") }}
          </template>
        </Column>
        <Column header="Località">
            <template #body="{ data }">
                <Button 
                label="Vedi" 
                class="p-button-sm p-button-info"
                @click="$router.push({ name: 'Locations', query: { region: data.name } })"
                />
            </template>
        </Column>
      </DataTable>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import Breadcrumb from "primevue/breadcrumb";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import ProgressSpinner from "primevue/progressspinner";
  
  export default {
    components: { Breadcrumb, DataTable, Column, ProgressSpinner },
    setup() {
      const regions = ref([]);
      const loading = ref(true);
  
      // Definire Breadcrumb
      const breadcrumbItems = ref([
        { label: "Home", to: "/" },
        { label: "Regioni", to: "/regions" },
      ]);

      const generationMap = {
        "generation-i": 1,
        "generation-ii": 2,
        "generation-iii": 3,
        "generation-iv": 4,
        "generation-v": 5,
        "generation-vi": 6,
        "generation-vii": 7,
        "generation-viii": 8,
        "generation-ix": 9,
      };
  
      // Recupera i dati delle regioni
      const fetchRegions = async () => {
        try {
          const response = await fetch("https://pokeapi.co/api/v2/region/");
          if (!response.ok) throw new Error("Errore nel recupero delle regioni");
          const data = await response.json();
          console.log("Regioni:", data.results);
          
          // Ottieni informazioni dettagliate per ogni regione
          const detailedRegions = await Promise.all(
            data.results.map(async (region) => {
                try {
                const res = await fetch(region.url);
                const regionData = await res.json();

                console.log("Nome:", regionData.name, "Main Generation:", regionData.main_generation);

                return {
                    name: regionData.name,
                    locations: regionData.locations,
                    main_generation: regionData.main_generation
                        ? generationMap[regionData.main_generation.name] || "N/A"  // Converte in numero o mostra "N/A"
                        : "N/A",
                    version_groups: regionData.version_groups.map(vg => vg.name.replace(/-/g, " ")),
                };
                } catch (error) {
                console.error("Errore nel recupero della regione:", error);
                return null;
                }
            })
            );

          console.log("Regioni:", detailedRegions);
  
          regions.value = detailedRegions;
        } catch (error) {
          console.error("Errore:", error);
        } finally {
          loading.value = false;
        }
      };
  
      onMounted(fetchRegions);
  
      return { regions, loading, breadcrumbItems };
    },
  };
  </script>
  