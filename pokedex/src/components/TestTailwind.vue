<template>
    <div class="p-6 bg-blue-500 text-white text-center min-h-screen">
      <h1 class="text-4xl font-bold">Test Tailwind</h1>
      <p class="mt-4 text-lg">Se vedi questa pagina con sfondo blu, Tailwind funziona! 🎉</p>
  
      <div class="mt-6 flex justify-center space-x-4">
        <button class="px-6 py-2 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg">
          Pulsante Verde
        </button>
        <button class="px-6 py-2 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg">
          Pulsante Rosso
        </button>
      </div>
  
      <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div class="p-4 bg-white text-black rounded shadow-md">
          Box 1
        </div>
        <div class="p-4 bg-white text-black rounded shadow-md">
          Box 2
        </div>
        <div class="p-4 bg-white text-black rounded shadow-md">
          Box 3
        </div>
        <div class="p-4 bg-white text-black rounded shadow-md">
          Box 4
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TestTailwind",
  };
  </script>
  