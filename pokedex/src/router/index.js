import { createRouter, createWebHistory } from "vue-router";
import Pokedex from "../components/Pokedex.vue"; // Importa il componente principale
import PokemonDetail from "../components/PokemonDetail.vue"; // Importa la pagina di dettaglio

const routes = [
  { path: "/", component: Pokedex },
  { path: "/pokemon/:id", component: PokemonDetail, name: "PokemonDetail" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
