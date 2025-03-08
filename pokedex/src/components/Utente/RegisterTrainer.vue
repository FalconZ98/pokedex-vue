<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-200">
      <div class="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold text-center mb-4">Registrazione Allenatore</h2>
  
        <form @submit.prevent="registerTrainer">
          <div class="mb-4">
            <label class="block text-gray-700">Nome</label>
            <input type="text" v-model="trainer.name" required class="w-full p-2 border rounded"/>
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-700">Email</label>
            <input type="email" v-model="trainer.email" required class="w-full p-2 border rounded"/>
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-700">Password</label>
            <input type="password" v-model="trainer.password" required class="w-full p-2 border rounded"/>
          </div>
  
          <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Registrati
          </button>
        </form>
  
        <p v-if="message" class="mt-4 text-center text-green-600">{{ message }}</p>
        <p v-if="error" class="mt-4 text-center text-red-600">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    setup() {
      const trainer = ref({ name: "", email: "", password: "" });
      const message = ref("");
      const error = ref("");
  
      const registerTrainer = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trainer.value),
          });
  
          if (!response.ok) throw new Error("Errore nella registrazione");
  
          message.value = "Registrazione avvenuta con successo!";
          error.value = "";
          trainer.value = { name: "", email: "", password: "" };
        } catch (err) {
          error.value = "Errore durante la registrazione.";
          message.value = "";
        }
      };
  
      return { trainer, registerTrainer, message, error };
    },
  };
  </script>
  