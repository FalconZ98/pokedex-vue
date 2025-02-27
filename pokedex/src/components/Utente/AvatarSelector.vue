<template>
    <div class="mt-4">
      <label class="block text-gray-700">Seleziona Avatar:</label>
      <div class="flex gap-4 mt-2 justify-center">
        <img 
          v-for="(avatar, index) in avatars" 
          :key="index" 
          :src="avatar" 
          class="w-16 h-16 rounded-full cursor-pointer border-2 border-transparent hover:border-blue-500"
          @click="$emit('avatarSelected', avatar)"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    setup() {
        const avatars = [
            "https://archives.bulbagarden.net/media/upload/d/d2/Spr_BW_Hilbert_2.png",
            "https://archives.bulbagarden.net/media/upload/d/dc/Spr_DP_Cyrus.png",
            "https://archives.bulbagarden.net/media/upload/2/2f/Spr_DP_Cynthia.png",
            "https://archives.bulbagarden.net/media/upload/0/00/Spr_DP_Dawn.png",
            "https://archives.bulbagarden.net/media/upload/e/e5/Spr_DP_Saturn.png",
            "https://archives.bulbagarden.net/media/upload/b/ba/Spr_DP_Mars.png"
            ];

      return { avatars };
    },
  };
  </script>
  