<template>
    <div class="min-h-screen flex flex-col items-center bg-gray-200 text-black p-6">
      <h2 class="text-3xl font-bold mb-6">🎮 Arcade Pokémon</h2>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <!-- Profilo Allenatore -->
        <router-link to="/profile" class="arcade-card">
          <img src="https://archives.bulbagarden.net/media/upload/2/2f/Spr_DP_Cynthia.png" alt="Trainer" class="w-24 mx-auto">
          <h3 class="text-xl font-bold text-center mt-3">👤 Profilo Allenatore</h3>
        </router-link>
  
        <!-- Squadra Pokémon -->
        <router-link to="/team-manager" class="arcade-card">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" alt="Team" class="w-24 mx-auto">
          <h3 class="text-xl font-bold text-center mt-3">🏆 Squadra Pokémon</h3>
        </router-link>
  
        <!-- PC di Bill -->
        <router-link to="/bill-pc" class="arcade-card">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pokémon_logo.svg" alt="PC Bill" class="w-24 mx-auto">
          <h3 class="text-xl font-bold text-center mt-3">🖥️ PC di Bill</h3>
        </router-link>
  
        <!-- Modalità Battaglia -->
        <router-link to="/battle-mode" class="arcade-card">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png" alt="Battle" class="w-24 mx-auto">
          <h3 class="text-xl font-bold text-center mt-3">⚔️ Modalità Battaglia</h3>
        </router-link>
  
        <!-- Inventario Oggetti -->
        <router-link to="/inventory" class="arcade-card">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Inventory" class="w-24 mx-auto">
          <h3 class="text-xl font-bold text-center mt-3">🎒 Inventario</h3>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .arcade-card {
    @apply bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:scale-105 transition transform duration-300 cursor-pointer;
  }
  </style>
  