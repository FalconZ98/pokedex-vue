import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Button from "primevue/button"
import { DataTable } from 'primevue';
import Column from 'primevue/column';


const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.mount('#app');