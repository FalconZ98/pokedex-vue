import { createRouter, createWebHistory } from "vue-router";
import Pokedex from "../components/Pokedex.vue"; // Importa il componente principale
import PokemonDetail from "../components/PokemonDetail.vue"; // Importa la pagina di dettaglio
import Home from "@/components/Home.vue";
import Regions from "@/components/Regions.vue";
import Locations from "@/components/Locations.vue";
import PokemonTeam from "@/components/PokemonTeam.vue";
import Profile from "@/components/Utente/Profile.vue";
import PokemonManager from "@/components/Utente/PokemonManager.vue";
import AvatarSelector from "@/components/Utente/AvatarSelector.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/pokedex", component: Pokedex, name: "Pokedex" },
  { path: "/pokemon/:id", component: PokemonDetail, name: "PokemonDetail" },
  { path: "/regions", name: "Regions", component: Regions },
  { path: "/locations", name: "Locations", component: Locations },
  { path: "/pokemon-team", name: "PokemonTeam", component: PokemonTeam },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/pokemon-manager", name: "PokemonManager", component: PokemonManager },
  { path: "/avatar-selector", name: "AvatarSelector", component: AvatarSelector },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
