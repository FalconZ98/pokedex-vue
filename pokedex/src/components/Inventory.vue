<template>
    <div class="min-h-screen flex flex-col items-center bg-gray-200 text-black p-6">
      <h2 class="text-3xl font-bold mb-6">🎒 Inventario Allenatore</h2>
  
      <!-- Sezione oggetti -->
      <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h3 class="text-xl font-semibold mb-4">Oggetti posseduti</h3>
  
        <!-- Lista oggetti -->
        <div v-if="inventory.length" class="grid grid-cols-2 gap-4">
          <div 
            v-for="(item, index) in inventory" 
            :key="index"
            class="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-md"
          >
            <div class="flex items-center gap-3">
              <img :src="item.image" class="w-12 h-12" />
              <div>
                <p class="capitalize font-semibold">{{ item.name }}</p>
                <p class="text-sm text-gray-500">Quantità: {{ item.quantity }}</p>
              </div>
            </div>
            <button 
              @click="useItem(index)" 
              class="px-4 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
            >
              Usa
            </button>
          </div>
        </div>
  
        <!-- Messaggio se non ci sono oggetti -->
        <div v-else class="text-center text-red-500 mt-4">
          Nessun oggetto nell'inventario.
        </div>
      </div>
  
      <!-- Bottone per aggiungere oggetti -->
      <button 
        @click="openItemDialog"
        class="mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition"
      >
        ➕ Aggiungi Oggetto
      </button>
  
      <!-- Modale per aggiungere oggetti -->
      <Dialog v-model:visible="showDialog" header="Aggiungi Oggetto" modal>
        <div class="flex flex-col gap-3">
          <Dropdown 
            v-model="selectedItem" 
            :options="availableItems" 
            optionLabel="name" 
            placeholder="Seleziona un oggetto"
            class="w-full"
          />
          <input 
            v-model.number="itemQuantity" 
            type="number" 
            min="1"
            class="w-full p-2 border border-gray-300 rounded" 
            placeholder="Quantità"
          />
          <button 
            @click="addItem"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Aggiungi
          </button>
        </div>
      </Dialog>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import Dialog from "primevue/dialog";
  import Dropdown from "primevue/dropdown";
  
  export default {
    components: { Dialog, Dropdown },
    setup() {
      const inventory = ref([]);
      const showDialog = ref(false);
      const selectedItem = ref(null);
      const itemQuantity = ref(1);
  
      // Oggetti disponibili
      const availableItems = ref([
        { name: "Pozione", image: "https://archives.bulbagarden.net/media/upload/7/7b/Potion.png" },
        { name: "Super Pozione", image: "https://archives.bulbagarden.net/media/upload/3/39/Super_Potion.png" },
        { name: "Pokéball", image: "https://archives.bulbagarden.net/media/upload/3/39/Pok%C3%A9_Ball.png" },
        { name: "Revitalizzante", image: "https://archives.bulbagarden.net/media/upload/e/e1/Revive.png" },
        { name: "Caramella Rara", image: "https://archives.bulbagarden.net/media/upload/d/dd/Rare_Candy.png" }
      ]);
  
      // Carica inventario dal LocalStorage
      onMounted(() => {
        const savedInventory = localStorage.getItem("trainerInventory");
        if (savedInventory) {
          inventory.value = JSON.parse(savedInventory);
        }
      });
  
      // Usa un oggetto
      const useItem = (index) => {
        if (inventory.value[index].quantity > 1) {
          inventory.value[index].quantity--;
        } else {
          inventory.value.splice(index, 1);
        }
        saveInventory();
      };
  
      // Aggiungi un nuovo oggetto
      const addItem = () => {
        if (!selectedItem.value || itemQuantity.value <= 0) return;
  
        // Controlla se l'oggetto esiste già
        const existingItem = inventory.value.find(item => item.name === selectedItem.value.name);
        if (existingItem) {
          existingItem.quantity += itemQuantity.value;
        } else {
          inventory.value.push({ 
            name: selectedItem.value.name, 
            image: selectedItem.value.image, 
            quantity: itemQuantity.value 
          });
        }
  
        saveInventory();
        showDialog.value = false;
      };
  
      // Salva l'inventario nel LocalStorage
      const saveInventory = () => {
        localStorage.setItem("trainerInventory", JSON.stringify(inventory.value));
      };
  
      // Apri il modale per aggiungere oggetti
      const openItemDialog = () => {
        selectedItem.value = null;
        itemQuantity.value = 1;
        showDialog.value = true;
      };
  
      return { inventory, availableItems, showDialog, selectedItem, itemQuantity, useItem, addItem, openItemDialog };
    },
  };
  </script>
  
  <style scoped>
  .pokemon-card {
    @apply bg-white shadow-lg rounded-lg p-6 flex flex-col items-center;
  }
  </style>
  