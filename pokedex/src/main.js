import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Button from "primevue/button"
import { DataTable } from 'primevue';
import Column from 'primevue/column';
import ProgressSpinner from 'primevue/progressspinner';
import router from './router';
import Paginator from 'primevue/paginator';
import Breadcrumb from 'primevue/breadcrumb';


const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false,
        }
    }
});
app.use(router);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Paginator', Paginator);
app.component('Breadcrumb', Breadcrumb);

app.mount('#app');