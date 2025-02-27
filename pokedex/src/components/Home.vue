<template>
    <div class="h-[calc(100vh-5rem)] bg-gray-200 text-white flex flex-col items-center justify-center p-6">
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
    </div>
  </template>
  