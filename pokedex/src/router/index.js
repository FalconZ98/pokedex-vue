import { createRouter, createWebHistory } from "vue-router";
import Pokedex from "../components/Pokedex.vue"; // Importa il componente principale
import PokemonDetail from "../components/PokemonDetail.vue"; // Importa la pagina di dettaglio
import Home from "@/components/Home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/pokedex", component: Pokedex, name: "Pokedex" },
  { path: "/pokemon/:id", component: PokemonDetail, name: "PokemonDetail" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
