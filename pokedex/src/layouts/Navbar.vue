<template>
    <nav class="bg-blue-500 text-white py-4 px-6 shadow-lg">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pokémon_logo.svg"
            alt="Pokémon Logo" class="w-32" />
        </router-link>
        <ul class="flex space-x-6 font-bold">
          <li>
            <router-link to="/" class="hover:text-yellow-400 transition">Home</router-link>
          </li>
          <li>
            <router-link to="/pokedex" class="hover:text-yellow-400 transition">Pokédex</router-link>
          </li>
          <li>
            <router-link to="/regions" class="hover:text-yellow-400 transition">Regioni</router-link>
          </li>
          <li>
            <router-link to="/locations" class="hover:text-yellow-400 transition">Locations</router-link>
          </li>
          <li>
            <router-link to="/" class="hover:text-yellow-400 transition">Lista abilità</router-link>
          </li>
          <li>
            <router-link to="/" class="hover:text-yellow-400 transition">Lista oggetti</router-link>
          </li>  
          <li>
            <router-link to="/arcade" class="hover:text-yellow-400 transition">Arcade</router-link>
          </li>  
        </ul>
      </div>
    </nav>
  </template>
  
  <script setup>
  </script>
  