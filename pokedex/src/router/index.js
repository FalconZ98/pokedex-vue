import { createRouter, createWebHistory } from "vue-router";
import Pokedex from "../components/Pokedex.vue"; // Importa il componente principale
import PokemonDetail from "../components/PokemonDetail.vue"; // Importa la pagina di dettaglio
import Home from "@/components/Home.vue";
import Regions from "@/components/Regions.vue";
import Locations from "@/components/Locations.vue";
import PokemonTeam from "@/components/PokemonTeam.vue";
import Profile from "@/components/Utente/Profile.vue";
import PokemonManager from "@/components/Utente/PokemonManager.vue";
import Arcade from "@/components/Arcade.vue";
import TeamManager from "@/components/TeamManager.vue";
import BattleMode from "@/components/BattleMode.vue";
import Inventory from "@/components/Inventory.vue";
import BillPC from "@/components/BillPC.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/pokedex", component: Pokedex, name: "Pokedex" },
  { path: "/pokemon/:id", component: PokemonDetail, name: "PokemonDetail" },
  { path: "/regions", name: "Regions", component: Regions },
  { path: "/locations", name: "Locations", component: Locations },
  { path: "/pokemon-team", name: "PokemonTeam", component: PokemonTeam },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/pokemon-manager", name: "PokemonManager", component: PokemonManager },
  { path: "/arcade", name: "Arcade", component: Arcade},
  { path: "/team-manager", name: "TeamManager", component: TeamManager},
  { path: "/battle-mode", name: "BattleMode", component: BattleMode},
  { path: "/inventory", name: "Inventory", component: Inventory},
  { path: "/bill-pc", name: "BillPC", component: BillPC}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
