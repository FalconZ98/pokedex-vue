<template>
    <div class="w-full h-[500px]">
      <l-map
        ref="map"
        :zoom="zoom"
        :center="center"
        class="w-full h-full"
      >
        <!-- Caricamento della mappa -->
        <l-tile-layer :url="tileLayerUrl" />
  
        <!-- Markers delle regioni Pokémon -->
        <l-marker
          v-for="region in regions"
          :key="region.name"
          :lat-lng="region.latlng"
          @click="goToRegion(region.name)"
        >
          <l-popup>
            <div class="text-center">
              <h3 class="font-bold capitalize">{{ region.name }}</h3>
              <p><strong>Generazione:</strong> {{ region.main_generation }}</p>
              <router-link :to="'/regions/' + region.name" class="text-blue-500 hover:underline">
                Vai ai dettagli
              </router-link>
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { LMap, LTileLayer, LMarker, LPopup } from "vue-leaflet";
  
  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPopup,
    },
    setup() {
      const center = ref([20, 0]); // Centro della mappa 🌍
      const zoom = ref(2); // Livello di zoom iniziale
      const tileLayerUrl = ref("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  
      // Coordinate delle regioni Pokémon (posizioni immaginate basate sui giochi)
      const regions = ref([
        { name: "kanto", latlng: [35.6895, 139.6917], main_generation: 1 }, // Giappone (Tokyo)
        { name: "johto", latlng: [36.2048, 138.2529], main_generation: 2 }, // Giappone Centrale
        { name: "hoenn", latlng: [33.5892, 130.4017], main_generation: 3 }, // Kyushu
        { name: "sinnoh", latlng: [45.0000, 142.0000], main_generation: 4 }, // Hokkaido
        { name: "unova", latlng: [40.7128, -74.0060], main_generation: 5 }, // USA (New York)
        { name: "kalos", latlng: [48.8566, 2.3522], main_generation: 6 }, // Francia (Parigi)
        { name: "alola", latlng: [21.3069, -157.8583], main_generation: 7 }, // Hawaii
        { name: "galar", latlng: [53.483959, -2.244644], main_generation: 8 }, // Regno Unito
        { name: "hisui", latlng: [45.0000, 142.0000], main_generation: 9 }, // Hokkaido (antico Sinnoh)
        { name: "paldea", latlng: [40.4637, -3.7492], main_generation: 9 }, // Spagna
      ]);
  
      // Funzione per navigare alla pagina dettagliata della regione
      const goToRegion = (regionName) => {
        window.location.href = `/regions/${regionName}`;
      };
  
      return { center, zoom, tileLayerUrl, regions, goToRegion };
    },
  };
  </script>
  
  <style>
  /* Personalizza la mappa */
  .leaflet-container {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  </style>
  