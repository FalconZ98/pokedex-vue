<template>
    <div class="flex flex-col items-center bg-gray-200 text-black p-6 h-[calc(100vh-5rem)]">
      <h2 class="text-3xl font-bold mb-4">Profilo Allenatore</h2>
  
      <!-- Avatar e Nome -->
      <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-screen-sm text-center">
        <img :src="trainer.avatar" class="w-36 h-36 rounded-full mx-auto" />
        <h3 class="text-xl font-semibold mt-2">{{ trainer.name }}</h3>
        <p class="text-gray-500">Livello: {{ trainer.level }}</p>
  
        <!-- Selezione Nome e Avatar -->
        <div class="mt-4">
          <label class="block text-gray-700">Nome Allenatore:</label>
          <input 
            v-model="trainer.name" 
            class="w-full p-2 border border-gray-300 rounded mt-2" 
            placeholder="Inserisci il tuo nome"
          />
  
          <AvatarSelector @avatarSelected="updateAvatar" />
        </div>
      </div>
  
      <!-- Squadra Pokémon -->
      <PokemonManager :team="trainer.team" @updateTeam="updateTeam" />
  
      <!-- Salvataggio -->
      <button 
        @click="saveProfile"
        class="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition"
      >
        Salva Profilo
      </button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import AvatarSelector from "@/components/Utente/AvatarSelector.vue";
  import PokemonManager from "@/components/Utente/PokemonManager.vue";
  
  export default {
    components: { AvatarSelector, PokemonManager },
    setup() {
      const trainer = ref({
        name: "Allenatore",
        avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/1.png",
        level: 1,
        team: [],
      });
  
      // Carica il profilo dal LocalStorage
      onMounted(() => {
        const savedProfile = localStorage.getItem("trainerProfile");
        if (savedProfile) {
          trainer.value = JSON.parse(savedProfile);
        }
      });
  
      // Aggiorna Avatar
      const updateAvatar = (avatarUrl) => {
        trainer.value.avatar = avatarUrl;
      };
  
      // Aggiorna Team Pokémon
      const updateTeam = (newTeam) => {
        trainer.value.team = newTeam;
      };
  
      // Salva il profilo nel LocalStorage
      const saveProfile = () => {
        localStorage.setItem("trainerProfile", JSON.stringify(trainer.value));
        alert("Profilo Salvato!");
      };
  
      return { trainer, updateAvatar, updateTeam, saveProfile };
    },
  };
  </script>
  