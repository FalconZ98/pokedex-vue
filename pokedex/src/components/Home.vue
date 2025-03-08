<template>
  <div class="h-[calc(100vh-5rem)] bg-gray-200 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pokémon_logo.svg"
        alt="Pokémon Logo" class="w-60 mt-6" />

    <p class="text-lg mt-4 text-black max-w-2xl text-center font-bold">
      Esplora il vasto mondo dei Pokémon! Scopri non solo le creature leggendarie, 
      ma anche le loro mosse, abilità, strumenti e le diverse regioni del mondo Pokémon. 
      Crea strategie, impara le statistiche e diventa un vero Maestro Pokémon!
    </p>

    <router-link to="/pokedex" class="mt-6 px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-600 transition">
      Esplora il Pokédex
    </router-link>

    <!-- Pokémon che camminano -->
    <div class="absolute bottom-20 w-full flex justify-between">
      <div 
        v-for="pokemon in randomPokemons" 
        :key="pokemon.id" 
        class="absolute w-32 h-32 animate-walk"
        :style="{ left: `${pokemon.startPosition}%`, animationDuration: `${pokemon.speed}s` }"
      >
        <img :src="pokemon.image" class="w-20 h-20" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
setup() {
  const randomPokemons = ref([]);

  const fetchRandomPokemons = async () => {
    try {
      const selectedIds = new Set();
      while (selectedIds.size < 12) {
        selectedIds.add(Math.floor(Math.random() * 1000) + 1); // Pokémon da 1 a 151 (prima generazione)
      }

      randomPokemons.value = Array.from(selectedIds).map(id => ({
        id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        startY: Math.random() * 80, // Posizione verticale casuale (tra 0 e 80vh)
        speed: Math.random() * 15 + 15, // Velocità casuale tra 15 e 30 secondi
        delay: Math.random() * 5 // Ritardo casuale per diversificare le partenze
      }));
    } catch (error) {
      console.error("Errore nel recupero dei Pokémon:", error);
    }
  };

  onMounted(fetchRandomPokemons);

  return { randomPokemons };
}
};
</script>

<style>
@keyframes walk {
0% {
  transform: translateX(-100px) translateY(0);
}
25% {
  transform: translateX(25vw) translateY(20px);
}
50% {
  transform: translateX(50vw) translateY(0);
}
75% {
  transform: translateX(75vw) translateY(20px);
}
100% {
  transform: translateX(100vw) translateY(0);
}
}

.animate-walk {
animation: walk linear infinite alternate;
}
</style>
